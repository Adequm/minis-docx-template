<template>
  <div class="navigation">
    <button 
      class="navigation__item"
      v-text="pageName"
      @click="$emit('switchModeEditor')"
    />

    <button 
      v-if="!isDesktop"
      class="navigation__item navigation__item-settings nofocus nohover"
      @click="$emit('openModal', 'settings')"
    >
      <Icon type="settings"/>
    </button>

    <button
      class="navigation__item navigation__item-special"
      :disabled="!isExistRepository"
      @click="isExistRepository && !isGenerated && $emit('generate')"
    >
      <Icon v-if="isGenerated" type="time-oclock" rotate/>
      <Icon v-else type="paper-plane"/>
    </button>
  </div>
</template>

<script>
import _ from 'lodash';
import Icon from './Icon';

import { translateMixin } from '@minis-core/mixins';

export default {
  name: 'Navigation',

  mixins: [translateMixin],

  components: {
    Icon,
  },

  props: {
    isDesktop: Boolean,
    isModeEditor: Boolean,
    isExistRepository: Boolean,
    isGenerated: Boolean,
  },

  data: () => ({
    lodash: _,
  }),

  computed: {
    pageName() {
      return this.isModeEditor 
        ? this.translate('files.title')
        : this.translate('editor.title');
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