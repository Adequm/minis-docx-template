<template>
  <div class="layout swiper-horizontal" id="layout-editor">

    <div class="input_files_container">
      <AppInputFiles 
        id="1"
        :placeholder="translate('files.inputs.files.placeholder')"
        icon="add-document"
        @upload="$emit('addFilesToGlobalRepository', $event.target.files)"
        multiple
      />
     <AppInputFiles 
        id="2"
        :placeholder="translate('files.inputs.folders.placeholder')"
        icon="add-folder"
        @upload="$emit('addFilesToGlobalRepository', $event.target.files)"
        allowdirs
        directory
        webkitdirectory
      />
    </div>

    <div class="layout__display">
      <div class="layout__display_content">
        <Swiper ref="swiper">
          <SwiperSlide>
            <div class="slide__container" :style="{ height: `${ slideHeight }px` }">
              <DisplayFiles
                v-if="globalRepositorySize"
                :data="repositoryArray"
                :path="globalRepositoryPath"
                :key="globalRepositoryHash"
                :displayWidth="appWidth - 40"
                @back="$emit('updateGlobalRepositoryPath')"
                @folder="$emit('updateGlobalRepositoryPath', $event)"
                @remove="$emit('deleteFileFromGlobalRepository', $event)"
              />
              <DisplayEmpty
                v-else
                :text="translate('files.displays.empty.title')"
                icon="folder"
              />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper-vue2';

import { translateMixin } from '@minis-core/mixins';

import DisplayEmpty from '../display/DisplayEmpty';
import DisplayFiles from '../display/DisplayFiles';

import { AppInputFiles } from '@minis-core/components';

export default {
  name: 'LayoutFiles',

  mixins: [translateMixin],

  components: {
    AppInputFiles,
    DisplayEmpty,
    DisplayFiles,
    Swiper,
    SwiperSlide,
  },

  props: {
    appWidth: Number,
    appHeight: Number,
    bodyHeight: Number,
    repositoryArray: Array,
    globalRepositoryHash: Number,
    globalRepositorySize: Number,
    globalRepositoryPath: String,
  },

  data: () => ({
    lodash: _,
    swiperRef: null,
    slideHeight: 0,
  }),

  watch: {
    appWidth: ['setSlideWidth', 'setSlideHeight'],
    appHeight: ['setSlideWidth', 'setSlideHeight'],
    bodyHeight: {
      immediate: true,
      handler: 'setSlideHeight',
    },
  },

  methods: {
    setSlideHeight() {
      this.$nextTick(() => {
        this.slideHeight = this.$refs?.swiper?.$el?.offsetHeight;
      })
    },

    setSlideWidth() {
      const width = this.appWidth - 40;
      const swiperWrapper = document.querySelector('#layout-editor .swiper-wrapper');
      _.invoke(swiperWrapper?.style, 'setProperty', 'max-width', `${ width }px`);

      const swiperSlides = document.querySelectorAll('#layout-editor .swiper-slide');
      [].forEach.call(swiperSlides, (slide, slideIndex) => {
        slide.style.setProperty('width', `${ width }px`);
        this.swiperRef.slidesGrid[slideIndex] = slideIndex * width;
        this.swiperRef.snapGrid[slideIndex] = slideIndex * width;
        this.swiperRef.slidesSizesGrid[slideIndex] = width;
      });
    },
  },

  mounted() {
    this.swiperRef = this.$refs.swiper.swiperRef;
    this.$nextTick(this.setSlideWidth);
  },
};
</script>

<style lang="scss" scoped>
.swiper-container {
  overflow: hidden;
}

.layout {
  height: 100%;
  flex-direction: column;
  display: flex;

  .input_files_container {
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: 1fr;
    height: calc(1.2em + 30px);
    font-size: 14px;
    gap: 10px;
    margin-bottom: 10px;  
  }

  .layout__display {
    border-radius: 10px; 
    overflow: hidden; 
    height: 100%;
    background: var(--main-bg-color);
    &:hover {
      outline: 1px solid var(--special-color);
    }

    .layout__display_content {
      height: 100%;
      box-sizing: border-box;
      position: relative;
      overflow-x: hidden;
      overflow-y: auto;

      .slide__container {
        overflow: hidden auto; 
        &::-webkit-scrollbar{
          background: transparent;
        }
      }
    }
  }
}
</style>