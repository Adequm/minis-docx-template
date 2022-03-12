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
      @openModal="$emit('openModal', $event)"
      @switchModeEditor="isModeEditor = !isModeEditor"
    />

    <div class="minis__display">

      <LayoutFiles
        v-if="!isModeEditor"
        :appWidth="appWidth"
        :appHeight="appHeight"
        :bodyHeight="bodyHeight"
        :slideIndex="slideIndexEditor"
        @changeSlide="slideIndexEditor = $event"
        @updateInputFocus="$emit('updateInputFocus', $event)"
      />

      <!-- <div class="files__wrapper">
        <AppInputFiles 
          placeholder="Выбор файлов"
          class="input_file"
          @uploadFiles="uploadFiles"
        />
        <div class="files__list">
          <div class="files__list_item"
            v-for="(file, index) of files"
            :key="index"
            v-text="file.name"
          />
        </div>
      </div> -->
    </div>

  </div>
</template>

<script>
import _ from 'lodash';

import Icon from './app/Icon';
// import LayoutEditor from './layouts/LayoutEditor';
// import LayoutCompare from './layouts/LayoutCompare';
// import LayoutHistory from './layouts/LayoutHistory';
import LayoutFiles from './layouts/LayoutFiles';

import AppInputFiles from './app/AppInputFiles';
import Navigation from './app/Navigation';

import { mapState, mapMutations } from 'vuex';

export default {
  name: 'LayoutContent',

  components: {
    Icon,
    LayoutFiles,
    // LayoutEditor,
    // LayoutCompare,
    // LayoutHistory,
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
    files: {},
  }),

  computed: {
    gridTemplateRows() {
      const header = Math.min(this.appHeight * 0.15, 85);
      const content = this.appHeight - header;
      return `${ header }px ${ content }px`;
    },
  },

  methods: {
    uploadFiles(event) {

      this.files = _.reduce(event.target.files, (acc, file, index) => {
        return _.assign(acc, { [file.name]: file });
      }, {});

      console.log(event.target.files);
    },

    keydown({ key, shiftKey }) {
      switch(key) {
        case 'Escape':
          this.$emit('switchSettings');
          break;
        // case 'ArrowLeft':
        //   this.swiperPage = 0;
        //   break;
        // case 'ArrowRight':
        //   this.swiperPage = 1;
        //   break;
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