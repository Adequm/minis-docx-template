<template>
  <div class="layout swiper-horizontal" id="layout-editor">

    <AppTextarea
      ref="textarea"
      style="margin-bottom: 10px;"
      :resize="appWidth"
      :value="isVariablesMode ? valueKey : valueResult"
      :placeholder="textareaPlaceholder"
      :title="textareaTitle"
      :titlePrepend="textareaTitlePrepend"
      @input="inputTextarea"
      @submit="submitTextarea"
      @updateInputFocus="$emit('updateInputFocus', $event)"
      @clickToTitle="$refs.textarea.focus() && (isVariablesMode = !isVariablesMode)"
    />

    <div class="layout__display" :class="{ isEnd, isBeginning }">
      <div class="layout__display_content">
        <Swiper ref="swiper" @activeIndexChange="$emit('changeSlide', $event.realIndex)">
          <template v-if="lodash.size(renderVariablesArray)">
            <SwiperSlide
              v-for="(chunk, chunkIndex) of renderVariablesArray"
              :key="chunkIndex"
            >
              <div class="slide__container" :style="{ height: `${ slideHeight }px` }">
                <DisplayEditor
                  v-if="chunk.length"
                  :chunk="chunk"
                  @remove="deleteVariable"
                  @edit="editVariable"
                />
                <DisplayEmpty
                  v-else
                  :text="translate('editor.displays.empty.title')"
                  icon="notebook"
                />
              </div>
            </SwiperSlide>
          </template>
          <SwiperSlide v-else>
            <div class="slide__container" :style="{ height: `${ slideHeight }px` }">
              <DisplayEmpty
                :text="translate('editor.displays.empty.title')"
                icon="notebook"
              />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      <SlideButtons
        :limit="slideList.length"
        :isBeginning="isBeginning"
        :isEnd="isEnd"
        :value="slideIndex"
        @input="$emit('changeSlide', $event)"
      />
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper-vue2';

import translateMixin from '../../mixins/translate.mixin';

import DisplayEditor from '../display/DisplayEditor';
import DisplayEmpty from '../display/DisplayEmpty';

import SlideButtons from '../app/SlideButtons';
import AppTextarea from '../app/AppTextarea';

export default {
  name: 'LayoutEditor',

  mixins: [translateMixin],

  components: {
    SlideButtons,
    AppTextarea,
    DisplayEditor,
    DisplayEmpty,
    Swiper,
    SwiperSlide,
  },

  props: {
    appWidth: Number,
    appHeight: Number,
    bodyHeight: Number,
    delimiterStart: String,
    delimiterEnd: String,
    renderVariablesArray: Array,
    slideIndex: Number,
  },

  data: () => ({
    lodash: _,
    swiperRef: null,
    slideHeight: 0,
    valueKey: null,
    valueResult: null,
    isVariablesMode: true,
  }),

  watch: {
    appWidth: ['setSlideWidth', 'setSlideHeight'],
    appHeight: ['setSlideWidth', 'setSlideHeight'],
    slideIndex(slideIndex) {
      this.swiperRef.slideTo(slideIndex);
      this.setSlideWidth();
    },
    bodyHeight: {
      immediate: true,
      handler: 'setSlideHeight',
    },
    valueKey: ['setSlideHeight'],
    valueResult: ['setSlideHeight'],
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
    textareaTitle() {
      const titleKey = this.delimiterStart + this.valueKey + this.delimiterEnd;
      return this.isVariablesMode 
        ? this.valueResult 
        : this.valueKey && titleKey;
    },
    textareaPlaceholder() {
      return this.isVariablesMode
        ? this.translate('editor.textareas.placeholders.key')
        : this.translate('editor.textareas.placeholders.value');
    },
    textareaTitlePrepend() {
      return this.isVariablesMode
        ? this.translate('editor.textareas.placeholders.value')
        : this.translate('editor.textareas.placeholders.key');
    },
  },

  methods: {
    setSlideHeight() {
      this.$nextTick(() => {
        this.slideHeight = this.$refs?.swiper?.$el?.parentElement?.offsetHeight;
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

    inputTextarea(value) {
      if(this.isVariablesMode) {
        this.valueKey = value;
      } else {
        this.valueResult = value;
      };
    },

    submitTextarea(value) {
      this.isVariablesMode = !this.isVariablesMode;
      if(this.valueKey && this.valueResult) {
        this.$emit('addRenderVariable', {
          index: this.slideIndex,
          value: this.valueResult,
          key: this.valueKey,
        });
        this.valueKey = '';
        this.valueResult = '';
      }
    },

    deleteVariable({ key }) {
      this.$emit('deleteRenderVariable', { key, index: this.slideIndex });
    },

    editVariable({ key, value }) {
      this.deleteVariable({ key });
      this.valueKey = key;
      this.valueResult = value;
      this.$refs.textarea.focus();
      this.isVariablesMode = false;
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
      height: calc(100% - 45px);
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