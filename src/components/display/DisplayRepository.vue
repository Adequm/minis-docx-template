<template>
  <div 
    class="container-scroll" 
    :style="{ gridTemplateColumns: `repeat(${ columnsRepeat }, minmax(170px, 1fr))` }"
  >

    <div class="chunk">
      <div class="chunk_item colorful" @click="$emit('back')">
        <span>...</span>
        <div style="float: right; display: flex;">
          <span style="margin-right: 3px;" v-text="lodash.size(repo)"/>
          <Icon type="arrow-down" :size="16"/>
        </div>
      </div>

      <div
        class="chunk_item"
        v-for="([dataKey, data]) of repo"
        :key="dataKey"
        :class="{ colorful: !data.isFile }"
        @click="!data.isFile && $emit('folder', dataKey)"
      >
        <span v-text="getName(data, dataKey)"/>
        <div style="float: right; display: flex;">
          <span v-if="!data.isFile" style="margin-right: 3px;" v-text="lodash.size(data)"/>
          <Icon type="trash" @click.stop="$emit('remove', dataKey)" :size="16"/>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import _ from 'lodash';
import Icon from '../app/Icon';

export default {
  name: 'DisplayRepository',

  components: {
    Icon,
  },

  props: {
    repository: Object,
    path: String,
  },

  data: () => ({
    lodash: _,
  }),

  computed: {
    repo() {
      const repo = this.path ? this.repository : this;
      const path = this.path ? this.path : 'repository';
      return _.chain(repo)
        .get(path, {})
        .entries()
        .sortBy('[1].isFile')
        .reverse()
        .value();
    },

    columnsRepeat() {
      return 1;
      // const length = this.chunk.length;
      // const repeat = Math.floor((this.displayWidth - (length+1) * 10) / 170);
      // return Math.min(repeat, length);
    },
  },

  methods: {
    getName(data, name) {
      if(data.isFile) return data.fullname;
      return `${ name }/`;
    }
  },
};
</script>

<style lang="scss" scoped>
.container-scroll {
  padding: 10px;
  padding-bottom: 0;
  font-size: 14px;
  box-sizing: border-box;
  overflow: auto;
  display: grid;
  grid-template-columns: minmax(170px, 1fr);
  gap: 10px;
  background: var(--main-bg-color);
  border-radius: 10px;
  width: auto;
  
  .chunk {
    display: grid; 
    gap: 10px; 
    grid-auto-rows: min-content;

    .chunk_item {
      padding: 10px;
      background: var(--content-bg-color);
      border-radius: 10px;
      cursor: pointer;
      overflow-wrap: anywhere;
      &.colorful {
        color: var(--special-color);
      }
      &:hover {
        opacity: .8;
      }
    }
  }
}

@media screen and (min-width: 768px) {
  .container-scroll {
    grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
  }
}
</style>