<template>
  <div class="container-scroll">

    <div class="chunk" :style="{ gridTemplateColumns: `repeat(${ columnsRepeat }, minmax(170px, 1fr))` }">
      <div 
        class="chunk_item chunk_item-first colorful" 
        :style="{ gridColumnEnd: columnsRepeat + 1 }"
        @click="$emit('back')"
      >
        <span v-text="pathLink"/>
        <div class="chunk_item_icons">
          <span style="margin-right: 3px;" v-text="lodash.size(data)"/>
          <Icon type="arrow-down" :size="16"/>
        </div>
      </div>

      <div
        class="chunk_item"
        v-for="([dataKey, data]) of data"
        :key="dataKey"
        :class="{ colorful: !data.isFile }"
        @click="!data.isFile && $emit('folder', dataKey)"
      >
        <span v-text="getName(data, dataKey)"/>
        <div class="chunk_item_icons">
          <span v-if="!data.isFile" style="margin-right: 3px;" v-text="lodash.size(data)"/>
          <Icon type="trash" @click.stop="$emit('remove', dataKey)" :size="16"/>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import _ from 'lodash';
import { Icon } from '@minis-core/components';

export default {
  name: 'DisplayFiles',

  components: {
    Icon,
  },

  props: {
    data: Array,
    path: String,
    displayWidth: Number,
  },

  data: () => ({
    lodash: _,
  }),

  computed: {
    columnsRepeat() {
      const length = _.size(this.data);
      const repeat = Math.floor((this.displayWidth - (length+1) * 10) / 170);
      return Math.min(repeat, length);
    },

    pathLink() {
      let link = '...';
      if(this.path) link += '/' + this.path.replace(/\./g, '/');
      return link;
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
  font-size: 14px;
  box-sizing: border-box;
  overflow: auto;
  display: grid;
  gap: 10px;
  background: var(--main-bg-color);
  border-radius: 10px;
  width: auto;
  
  .chunk {
    display: grid; 
    gap: 10px; 
    grid-auto-rows: min-content;

    &_item {
      padding: 10px;
      background: var(--content-bg-color);
      border-radius: 10px;
      cursor: pointer;
      display: flex;
      overflow-wrap: anywhere;
      &-first { grid-column-start: 1; }
      &.colorful { color: var(--special-color); }
      &:hover { opacity: .8; }
      &_icons {
        float: right;
        display: flex;
        margin-bottom: auto;
        margin-left: auto;
      }
    }
  }
}
</style>