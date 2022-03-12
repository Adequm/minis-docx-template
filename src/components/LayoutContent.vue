<template>
  <div 
    class="minis__content"
    :style="{ 
      minHeight: `${ appHeight }px`,
      gridTemplateRows
    }"
  >
    <Navigation
      :isDesktop="isDesktop"
      :isModeEditor="isModeEditor"
      :isExistRepository="!!globalRepositorySize"
      @openModal="$emit('openModal', $event)"
      @switchModeEditor="isModeEditor = !isModeEditor"
      @generate="generateDocx(repositoryArray)"
    />

    <div class="minis__display">

      <LayoutFiles
        v-if="!isModeEditor"
        :appWidth="appWidth"
        :appHeight="appHeight"
        :bodyHeight="bodyHeight"
        :slideIndex="slideIndexEditor"
        :repositoryArray="repositoryArray"
        :globalRepositoryPath="globalRepositoryPath"
        :globalRepositoryHash="globalRepositoryHash"
        :globalRepositorySize="globalRepositorySize"
        @changeSlide="slideIndexEditor = $event"
        @addFilesToGlobalRepository="addFilesToGlobalRepository"
        @deleteFileFromGlobalRepository="deleteFileFromGlobalRepository"
        @updateGlobalRepositoryPath="updateGlobalRepositoryPath"
      />

    </div>

  </div>
</template>

<script>
import _ from 'lodash';

import generateDocxMixin from '../mixins/generate-docx.mixin';

import LayoutFiles from './layouts/LayoutFiles';

import Icon from './app/Icon';
import AppInputFiles from './app/AppInputFiles';
import Navigation from './app/Navigation';

import { mapState, mapMutations, mapActions } from 'vuex';

export default {
  name: 'LayoutContent',

  mixins: [generateDocxMixin],

  components: {
    Icon,
    LayoutFiles,
    AppInputFiles,
    Navigation,
  },

  props: {
    appWidth: Number,
    appHeight: Number,
    bodyHeight: Number,
    isDesktop: Boolean,
    isWidthMore768: Boolean,
  },

  data: () => ({
    lodash: _,
    isModeEditor: false,
    slideIndexEditor: 0,
  }),

  computed: {
    ...mapState([
      'repositoryArray',
      'globalRepositoryPath',
      'globalRepositoryHash',
      'globalRepositorySize',
    ]),
    gridTemplateRows() {
      const header = Math.min(this.appHeight * 0.15, 85);
      const content = this.appHeight - header;
      return `${ header }px ${ content }px`;
    },
  },

  methods: {
    ...mapActions([
      'addFilesToGlobalRepository',
      'deleteFileFromGlobalRepository',
      'updateGlobalRepositoryPath',
    ]),

    keydown({ key, shiftKey }) {
      switch(key) {
        case 'Escape':
          this.$emit('switchSettings');
          break;
      }
    },
  },

  beforeMount() {
    document.addEventListener('keydown', this.keydown);
  },

  beforeDestroy() {
    document.removeEventListener('keydown', this.keydown);
  },
};
</script>

<style lang="scss">
.swiper-container, 
.swiper-wrapper, 
.swiper-slide {
  height: 100% !important;
}

.swiper-horizontal {
  .swiper-wrapper {
    display: grid !important;
    grid-auto-flow: column !important;
  }
}

.swiper-vertical {
  .swiper-wrapper {
    display: block !important;
    grid-auto-flow: column !important;
  }
}

.minis__content {
  display: grid;
  height: inherit;
  background-color: var(--main-bg-color);
  color: var(--text-color);
  font-size: 18px;
  position: relative;
  top: 0;
  z-index: 1;

  .minis__display {
    padding: 20px;
    position: relative;
    z-index: 2;
    background-color: var(--content-bg-color);
    border-radius: 10px;

    .files__wrapper {
      height: 100%;
      display: flex;
      flex-direction: column;
      .files__list {
        background: var(--main-bg-color);
        height: 100%;
        border-radius: 10px;
        padding: 10px;
        &_item {
          border-radius: 10px;
        }
      }
    }
  }
}

@media screen and (min-width: 768px) {
  .minis__content {
    border-radius: 10px;
    clip-path: polygon(
      0 5px, 5px 0, calc(100% - 5px) 0, 101% 5px, 
      101% calc(100% - 5px), calc(100% - 5px) 101%, 5px 101%, 0 calc(100% - 5px)
    );
    .minis__display {
      padding-bottom: 30px;
    }
  }
}
</style>