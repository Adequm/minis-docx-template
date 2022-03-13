import _ from 'lodash';
import Vue from 'vue';

import PizZip from 'pizzip';
import JSZip from 'jszip';
import Docxtemplater from 'docxtemplater';
import { saveAs } from 'file-saver';

import { mapState } from 'vuex';

export default {
	data: () => ({
		isConvertDocToDocx: false,
		isGenerated: false,
		archiveJSON: {},
		convertsRenderVariables: {},
	}),

	computed: {
		...mapState([
			'delimiterStart', 
			'delimiterEnd',
			'renderVariables',
			'renderVariablesArray',
		]),
	},

	methods: {
		async generateDocx(items = []) {
			try {
				this.isGenerated = true;
				await this.getConvertRenderVariables();
				await this.addToArchiveJSON(items);
				const zip = await this.zipArchive(new JSZip(), this.archiveJSON);
				const content = await zip.generateAsync({ type: 'blob' });
				saveAs(content, `${Date.now()}.zip`);
			} catch(err) {
				console.error('generateDocx: ', err);
			} finally {
				this.isGenerated = false;
			}
		},

		getConvertRenderVariables() {
			const data = this.renderVariablesArray[this.slideIndexEditor];
			const result = _.chain(data).map(_.values).fromPairs().value();
			Vue.set(this, 'convertsRenderVariables', result);
		},

		convertDocToDocx(name, data) {
			return new Promise(async resolve => {
				try {
					const convertApi = ConvertApi.auth({ secret: 'MVr5O4MfBxWNyK0U' });
					const params = convertApi.createParams();
					params.add('File', data.file);
					const response = await convertApi.convert('doc', 'docx', params);
					const link = response?.files?.[0].Url;
					if(!link) throw 'Empty [link]';
					const file = await new Promise(resolve => fetch(link).then(res => res.blob()).then(resolve));
					if(file) {
						name = name.replace(/,doc$/, ',docx');
						data.file = file;
						data.fullname = data.fullname.replace(/\.doc$/, '.docx');
						data.ext = 'docx';
					}
				} catch(err) {
					console.error('convertDocToDocx: ', err);
				} finally {
					resolve({ name, data });
				}
			})
		},

		convertTemplate(data) {
			return new Promise(async (resolve, reject) => {
				let doc;
				if(data.ext == 'docx') {
					try {
						const reader = new FileReader();
						reader.readAsBinaryString(data.file);
						reader.onerror = console.error;
						const event = await new Promise(resolve => reader.onload = resolve);
						doc = await this.convertTemplateDocx(event);
					} catch(err) { reject(err); }
				} else doc = data.file;
				resolve(doc);
			})
		},

		convertTemplateDocx(event) {
			try {
				const content = event.target.result;
		    const zip = new PizZip(content);

		    const { delimiterStart: start, delimiterEnd: end } = this;
		    const options = {
	        delimiters: { start, end },
	        paragraphLoop: true,
	        linebreaks: true,
	      };

	      const doc = new Docxtemplater(zip, options);
	      doc.render(this.convertsRenderVariables);
	      const mimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
				return doc.getZip().generate({ type: 'blob', mimeType });
			} catch(err) {
				console.error('Docxtemplater: ', err);
			}
		},

		addToArchiveJSON(items = [], path = '') {
			return new Promise(async resolve => {
				const promises = _.map(items, ([name, data]) => {
					return new Promise(async resolve => {
						if(data.isFile) {
							if(data.ext === 'doc' && this.isConvertDocToDocx) {
								const response = await this.convertDocToDocx(name, data);
								name = response.name;
								data = response.data;
							}
							try {
								const doc = await this.convertTemplate(data);
								const filename = data.fullname.replace(/\./g, ',');
								const localPath = path ? `${path}.${filename}` : filename;
								_.set(this.archiveJSON, localPath, doc);
							} catch(err) {
								console.dir('FileReader, convert: ', err);
							}
						} else {
							const localPath = path ? `${path}.${name}` : name;
							await this.addToArchiveJSON(_.entries(data), localPath);
						}
						resolve();
					})
				})

				await Promise.all(promises);
				resolve();
			})
		},

		zipArchive(zip, json, path = '') {
			return new Promise(async resolve => {
				const promises = _.map(json, (data, name) => {
					return new Promise(async resolve => {
						const filename = name.replace(/,/g, '.');
						const fullpath = path ? `${path}/${filename}` : filename;
						if(_.isPlainObject(data)) { // папка
							await this.zipArchive(zip, data, fullpath);
						}	else {
							await zip.file(fullpath, data, { createFolders: true });
						}
						resolve();
					});
				});
				await Promise.all(promises);
				resolve(zip);
			});
		},
	},
};