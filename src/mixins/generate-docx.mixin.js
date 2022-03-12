import _ from 'lodash';

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
	}),

	computed: {
		...mapState([
			'delimiterStart', 
			'delimiterEnd',
			'renderVariables',
		]),
	},

	methods: {
		async generateDocx(items = []) {
			this.isGenerated = true;
			await this.addToArchiveJSON(items);
			const zip = await this.zipArchive(new JSZip(), this.archiveJSON);
			const content = await zip.generateAsync({ type: 'blob' });
			saveAs(content, `${Date.now()}.zip`);
			this.isGenerated = false;
		},

		addToArchiveJSON(items = [], path = '') {
			return new Promise(async resolve => {
				const promises = _.map(items, ([name, data]) => {
					return new Promise(async resolve => {
						if(data.isFile) {
							if(data.ext === 'doc' && this.isConvertDocToDocx) {
								try {
									const convertApi = ConvertApi.auth({ secret: 'MVr5O4MfBxWNyK0U' });
									const params = convertApi.createParams();
									params.add('File', data.file);
									const response = await convertApi.convert('doc', 'docx', params);
									const link = response?.files?.[0].Url;
									if(!link) return resolve();
									data.file = await new Promise(resolve => fetch(link).then(data => data.blob()).then(resolve));
									if(!data.file) return resolve();
									data.fullname = data.fullname.replace(/\.doc$/, '.docx');
									name = name.replace(/,doc$/, ',docx');
									data.ext = 'docx';
								} catch(err) {
									console.error(err);
								}
							}
							try {
								let doc;
								if(data.ext == 'docx') {
									const reader = new FileReader();
									reader.readAsBinaryString(data.file);
									reader.onerror = console.error;
									const event = await new Promise(resolve => reader.onload = resolve);
									doc = await this.convertDoc(event);
								} else doc = data.file;
								const localPath = path ? `${path}.${name}` : name;
								_.set(this.archiveJSON, localPath, doc);
							} catch(err) {
								console.dir(err);
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

		convertDoc(event) {
			const content = event.target.result;
	    const zip = new PizZip(content);

	    const { delimiterStart: start, delimiterEnd: end } = this;
	    const options = {
        delimiters: { start, end },
        paragraphLoop: true,
        linebreaks: true,
      };

      const doc = new Docxtemplater(zip, options);
      doc.render(this.renderVariables);
      const mimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
			return doc.getZip().generate({ type: 'blob', mimeType });
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