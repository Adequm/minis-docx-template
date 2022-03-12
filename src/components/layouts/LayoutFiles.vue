<template>
  <div class="layout swiper-horizontal" id="layout-editor">

    <div class="input_files_container">
      <AppInputFiles 
        id="1"
        placeholder="Файлы"
        icon="add-document"
        @upload="$emit('addFilesToGlobalRepository', $event.target.files)"
        multiple
      />
     <AppInputFiles 
        id="2"
        placeholder="Папки"
        icon="add-folder"
        @upload="$emit('addFilesToGlobalRepository', $event.target.files)"
        allowdirs
        directory
        webkitdirectory
      />
    </div>

    <div class="layout__display" :class="{ isEnd, isBeginning }">
      <div 
        class="layout__display_content" 
        :style="{ height: '100%' }"
      >
        <Swiper ref="swiper" @activeIndexChange="$emit('changeSlide', $event.realIndex)">
          <SwiperSlide>
            <div class="slide__container" :style="{ height: `${ slideHeight }px` }">
              <DisplayRepository
                v-if="globalRepositorySize"
                :data="repositoryArray"
                :path="globalRepositoryPath"
                :key="globalRepositoryHash"
                :displayWidth="appWidth - 40"
                :style="{ paddingBottom: 0 }"
                @back="$emit('updateGlobalRepositoryPath')"
                @folder="$emit('updateGlobalRepositoryPath', $event)"
                @remove="$emit('deleteFileFromGlobalRepository', $event)"
              />
              <DisplayEmpty
                v-else
                :text="translate('files.displays.repository.title')"
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

import translateMixin from '../../mixins/translate.mixin';

import DisplayEmpty from '../display/DisplayEmpty';
import DisplayRepository from '../display/DisplayRepository';

import AppInputFiles from '../app/AppInputFiles';

export default {
  name: 'LayoutFiles',

  mixins: [translateMixin],

  components: {
    AppInputFiles,
    DisplayEmpty,
    DisplayRepository,
    Swiper,
    SwiperSlide,
  },

  props: {
    appWidth: Number,
    appHeight: Number,
    bodyHeight: Number,
    slideIndex: Number,
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
    textareaHeight: ['setSlideWidth', 'setSlideHeight'],
    slideIndex(slideIndex) {
      this.swiperRef.slideTo(slideIndex);
      this.setSlideWidth();
    },
    bodyHeight: {
      immediate: true,
      handler: 'setSlideHeight',
    },
  },

  computed: {
    isEnd() {
      const isEndSlide = this.slideIndex === this.slideList.length - 1;
      return !!this.swiperRef && this.swiperRef.isEnd || isEndSlide;
    },
    isBeginning() {
      const isBeginningSlide = this.slideIndex === 0;
      return !!this.swiperRef && this.swiperRef.isBeginning || isBeginningSlide;
    },
    slideList() {
      return this.swiperRef?.slides || [];
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
      const slideTransform = `translate3d(-${ this.slideIndex * width }px, 0px, 0px)`;

      const swiperWrapper = document.querySelector('#layout-editor .swiper-wrapper');
      _.invoke(swiperWrapper?.style, 'setProperty', 'max-width', `${ width }px`);
      _.invoke(swiperWrapper?.style, 'setProperty', 'transform', slideTransform);

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
    this.swiperRef.slideTo(this.slideIndex, 0);
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

    &::after, &::before {
      content: '';
      position: absolute;
      width: 10px;
      height: 20px;
      clip-path: polygon(0 0, 100% 50%, 0 100%);
      background-color: var(--special-color);
      top: calc(50% + 35px/2);
    }
    &::before {
      left: calc(100% - 20px);
    }
    &::after {
      right: calc(100% - 20px);
      transform: scale(-1);
    }

    &.isEnd::before { display: none; }
    &.isBeginning::after { display: none; }

    .layout__display_content {
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