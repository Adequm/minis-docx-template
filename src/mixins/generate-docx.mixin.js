import _ from 'lodash';

import PizZip from 'pizzip';
import JSZip from 'jszip';
import Docxtemplater from 'docxtemplater';
import { saveAs, loadFile } from 'file-saver';

import { mapState } from 'vuex';

export default {
	data: () => ({
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
			console.log('start');
			await this.addToArchiveJSON(items);
			const zip = await this.zipArchive(new JSZip(), this.archiveJSON);
			const content = await zip.generateAsync({ type: 'blob' });
			saveAs(content, 'result.zip');
			console.log('end');
		},

		addToArchiveJSON(items = [], path = '') {
			return new Promise(async resolve => {
				const promises = _.map(items, ([name, data]) => {
					return new Promise(async resolve => {
						if(data.isFile) {
							// if(data.ext === 'doc') {
							// 	try {
							// 		const convertApi = ConvertApi.auth({ secret: 'MVr5O4MfBxWNyK0U' })
							// 		const params = convertApi.createParams();
							// 		params.add('File', data.file);
							// 		const response = await convertApi.convert('doc', 'docx', params);
							// 		const link = response?.files?.[0].Url;
							// 		if(!link) return resolve();
							// 		data.file = await new Promise(resolve => loadFile(url, (err, data) => resolve(data)));
							// 		if(!data.file) return resolve();
							// 		data.fullname = data.fullname.replace(/\.doc$/, '.docx');
							// 		name = name.replace(/\.doc$/, '.docx');
							// 		data.ext = 'docx';
							// 	} catch(err) {
							// 		console.error(err);
							// 	}
							// }

							if(data.ext !== 'docx') return resolve();
							const reader = new FileReader();
							reader.readAsBinaryString(data.file);
							reader.onerror = console.error;
							const event = await new Promise(resolve => reader.onload = resolve);
							const doc = await this.convertDoc(event, data.file);
							const localPath = path ? `${path}.${name}` : name;
							_.set(this.archiveJSON, localPath, doc);
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

		convertDoc(event, file) {
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

		zipArchive(zip, json) {
			return new Promise(async resolve => {
				const promises = _.map(json, (data, name) => {
					return new Promise(async resolve => {
						await zip.file(name.replace(/,/g, '.'), data);
						resolve();
					});
				});
				await Promise.all(promises);
				resolve(zip);
			});
		},
	},

	mounted() {
		this.archiveJSON = {};
	},
};