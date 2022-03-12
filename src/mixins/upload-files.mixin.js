import _ from 'lodash';
import PizZip from 'pizzip';

export default {
	data: () => ({
		globalRepositoryHash: null,
		globalRepositorySize: null,
		globalRepositoryPath: null,
		globalRepository: {},
	}),

	methods: {
		addFilesToGlobalRepository(files) {
			_.each(files, (file, fileIndex) => {
				if(file.name.startsWith('~') || file.name.startsWith('.')) return;
				const path = (file.webkitRelativePath || file.name).replace(/\./g, ',').split('/');

				const fullnameArray = _.last(path).split(',');
				const fullname = fullnameArray.join('.');
				const ext = _.last(fullnameArray);
				const name = fullnameArray.slice(0, -1).join('.');
				const isFile = true;

				let globalRepository, globalRepositoryPath;
				if(this.globalRepositoryPath) {
					globalRepository = this.globalRepository;
					globalRepositoryPath = this.globalRepositoryPath;
				} else {
					globalRepository = this;
					globalRepositoryPath = 'globalRepository';
				}

				const repository = _.get(globalRepository, globalRepositoryPath, {});
				_.set(repository, path.join('.'), { file, name, ext, isFile, fullname });
				_.set(globalRepository, globalRepositoryPath, repository);
			});
			this.globalRepositorySize = _.size(this.globalRepository);
			this.globalRepositoryHash = Date.now();
		},

		deleteFileFromGlobalRepository(file) {
			const path = _.chain(this.globalRepositoryPath)
				.split('.')
				.compact()
				.concat(file)
				.join('.')
				.value();
			this.globalRepository = _.omit(this.globalRepository, path);
			this.globalRepositorySize = _.size(this.globalRepository);
			this.globalRepositoryHash = Date.now();
		},

		updatePath(folder) {
			const path = _.compact(_.split(this.globalRepositoryPath, '.'));
			if(!folder && !path.length) return;
			if(!folder) {
				this.globalRepositoryPath = _.join(path.slice(0, -1), '.');
			} else {
				this.globalRepositoryPath = _.join(path.concat(folder), '.');
			}
		},
	},

	mounted() {
		this.globalRepositorySize = _.size(this.globalRepository);
		this.globalRepositoryHash = Date.now();
	},
};