<template>
  <div class="navigation">
    <button 
      v-if="!isModeCompare"
      class="navigation__item"
      v-text="pageName"
      @click="$emit('switchModeEditor')"
    />
    <div v-else class="navigation__item nohover" style="cursor: default;">
      <span v-text="compareStep"/>
      <div class="compare_loader" :style="{ width: compareLoaderWidth }"/>
    </div>

    <button 
      v-if="!isDesktop"
      class="navigation__item navigation__item-settings nofocus nohover"
      @click="$emit('openModal', 'settings')"
    >
      <Icon type="settings"/>
    </button>

    <button 
      v-if="isModeEditor"
      class="navigation__item navigation__item-special"
      :disabled="!isEditorDataExist"
      @click="isEditorDataExist && $emit('switchModeCompare')"
    >
      <Icon :type="isModeCompare ? 'cross-small' : 'paper-plane'"/>
    </button>
    <button 
      v-else
      class="navigation__item nofocus"
      style="color: var(--special-color);"
      :disabled="!isHistoryExist"
      @click="isHistoryExist && $emit('switchModeHistory')"
    >
      <Icon :type="isHistoryModeAnswers ? 'menu-dots-vertical' : 'menu-dots'"/>
    </button>
  </div>
</template>

<script>
import Icon from './Icon';

import translateMixin from '../../mixins/translate.mixin';

export default {
  name: 'Navigation',

  mixins: [translateMixin],

  components: {
    Icon,
  },

  props: {
    isDesktop: Boolean,
    isModeCompare: Boolean,
    isModeEditor: Boolean,
    isHistoryExist: Boolean,
    isEditorDataExist: Boolean,
    isHistoryModeAnswers: Boolean,
    compareQuestionIndex: Number,
    compareMaxQuestionsIndex: Number,
  },

  data: () => ({
    console,
  }),

  computed: {
    compareLoaderWidth: ths => `${ +(ths.compareQuestionIndex / ths.compareMaxQuestionsIndex * 100).toFixed(2) }%`,
    pageName() {
      return this.isModeEditor 
        ? this.translate('files.title')
        : this.translate('editor.title');
    },
    compareStep() {
      const stepName = this.translate('compare.title');
      return `${ stepName }: ${ this.compareQuestionIndex }/${ this.compareMaxQuestionsIndex }`;
    },
  },
};
</script>

<style lang="scss" scoped>
.navigation {
  user-select: none; 
  padding: 20px;
  border-radius: 10px;
  display: flex;
  gap: 10px;
  box-sizing: border-box;
  z-index: 5;
  font-size: 16px;
  font-weight: bold;
  justify-content: space-between;

  button:not(.nofocus):focus {
    outline: 1px solid var(--text-color);
  }

  &__item {
    cursor: pointer;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    background-color: var(--content-bg-color);
    user-select: none; 
    padding: 0;

    &:nth-child(1) {
      width: 200%;
      max-width: 300px;
    }

    &.navigation__item-settings {
      margin-left: auto;
      width: 100%;
      max-width: 50px;
    }

    &:nth-last-child(1) {
      width: 100%;
      max-width: 150px;
    }

    &:not(.nohover):hover { opacity: .8; }
    &-special {
      background-color: var(--special-color);
      color: #F3F3F3;
    }
    &[disabled] {
      cursor: default;
      color: var(--main-bg-color) !important;
      background-color: var(--content-bg-color);
    }
    .compare_loader {
      position: absolute;
      height: 100%;
      left: 0;
      top: 0;
      max-width: 100%;
      border-radius: 10px;
      background-color: var(--special-color);
      opacity: .5;
      transition: width .5s;
    }
  }
}
</style>