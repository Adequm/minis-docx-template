import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import createMutationsSharer from 'vuex-shared-mutations';
import _ from 'lodash';

import minisModule from './minis';
const projectKey = location.pathname.split('/')[1];

const store = {};
Vue.use(Vuex);

store.state = () => ({
  isFullscreen: false,
  projectKey: projectKey.split('-').slice(1).join('-'),
  delimiterStart: '{{:',
  delimiterEnd: ':}}',
  globalRepositoryHash: null,
  globalRepositorySize: null,
  globalRepositoryPath: null,
  globalRepository: {},
  repositoryArray: [],
  renderVariablesArray: [],
});


store.actions = {
  addFilesToGlobalRepository({ commit, state }, files) {
    _.each(files, (file, fileIndex) => {
      if(file.name.startsWith('~') || file.name.startsWith('.')) return;
      const path = (file.webkitRelativePath || file.name).replace(/\./g, ',').split('/');

      const fullnameArray = _.last(path).split(',');
      const fullname = fullnameArray.join('.');
      const ext = _.last(fullnameArray);
      const name = fullnameArray.slice(0, -1).join('.');
      const isFile = true;

      commit('addFileToGlobalRepository', {
        path: path.join('.'),
        file: { file, name, ext, isFile, fullname }
      });
    });
    commit('updateRepositoryArray');
    commit('updateHash');
  },

  updateGlobalRepositoryPath({ commit, state }, folder) {
    const path = _.compact(_.split(state.globalRepositoryPath, '.'));
    if(!folder && !path.length) return;
    const globalRepositoryPath = folder
      ? _.join(path.concat(folder), '.')
      : _.join(path.slice(0, -1), '.');
    commit('updateGlobalRepositoryPath', globalRepositoryPath);
    commit('updateRepositoryArray');
    commit('updateHash');
  },

  deleteFileFromGlobalRepository({ commit, state }, filename) {
    const path = _.chain(state.globalRepositoryPath)
      .split('.')
      .compact()
      .concat(filename)
      .join('.')
      .value();
    commit('updateGlobalRepository', _.omit(state.globalRepository, path));
    commit('updateRepositoryArray');
    commit('updateHash');
  },
};


store.mutations = {
  switchFullscreen: state => Vue.set(state, 'isFullscreen', !state.isFullscreen),
  addFileToGlobalRepository(state, { path, file }) {
    const repository = state.globalRepositoryPath ? state.globalRepository : state;
    const pathToRepo = state.globalRepositoryPath || 'globalRepository';
    const chunk = _.get(repository, pathToRepo, {});
    _.set(chunk, path, file);
    _.set(repository, pathToRepo, chunk);
  },

  updateGlobalRepositoryPath: (state, path) => Vue.set(state, 'globalRepositoryPath', path),
  updateGlobalRepository: (state, repository) => Vue.set(state, 'globalRepository', repository),

  updateHash(state) {
    state.globalRepositorySize = _.size(state.globalRepository);
    state.globalRepositoryHash = Date.now();
  },

  updateRepositoryArray(state) {
    const isExistPath = !!state.globalRepositoryPath;
    const repo = isExistPath ? state.globalRepository : state;
    const path = isExistPath ? state.globalRepositoryPath : 'globalRepository';
    state.repositoryArray = _.chain(repo)
      .get(path, {})
      .entries()
      .sortBy('[1].isFile')
      .reverse()
      .value();
  },

  addRenderVariable({ renderVariablesArray }, { index, key, value }) {
    const chunk = _.get(renderVariablesArray, index, []);
    chunk.push({ key, value });
    Vue.set(renderVariablesArray, index, chunk);
  },

  deleteRenderVariable({ renderVariablesArray }, { key, index }) {
    const chunk = _.get(renderVariablesArray, index);
    if(!chunk) return;
    const indexItem = _.findIndex(chunk, { key });
    chunk.splice(indexItem, 1);
    if(_.size(chunk)) {
      Vue.set(renderVariablesArray, index, chunk);
    } else {
      renderVariablesArray.splice(index, 1);
    }
  },
};


const persistedMinis = [
  'minis.minisThemeMain', 
  'minis.minisThemeSpecial', 
  'minis.minisLang',
  'minis.themesJSON', 
  'minis.translateJSON', 
  'minis.minisJSON',
];
const persistedLocal = [
  'isFullscreen',
  'renderVariablesArray', 
  'delimiterStart', 
  'delimiterEnd',
];
store.modules = { minis: minisModule };
store.plugins = [
  createMutationsSharer({ predicate: () => [...persistedMinis, ...persistedLocal] }),
  createPersistedState({ paths: persistedMinis, key: 'minis' }),
  createPersistedState({ paths: persistedLocal, key: projectKey }),
];

export default new Vuex.Store(store);