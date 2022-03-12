import _ from 'lodash';

import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import { saveAs } from 'file-saver';

import { mapState } from 'vuex';

export default {
	computed: {
		...mapState(['delimiterStart', 'delimiterEnd']),

		renderOptions() {
			return {
        first_name: 'John',
        last_name: 'Doe',
        phone: '0652455478',
        description: 'New Website',
      }
		},
	},

	methods: {
		generateDocx(files = []) {
			_.each(files, file => {
				console.log(file);
				// const reader = new FileReader();
				// reader.readAsBinaryString(file);
				// reader.onerror = console.error;
				// reader.onload = event => this.convertDoc(event, file);
			});
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
      doc.render(this.renderOptions);
      const mimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
			const out = doc.getZip().generate({ type: 'blob', mimeType });

			saveAs(out, file.name);
		},
	},
};