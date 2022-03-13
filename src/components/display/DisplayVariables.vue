<template>
  <div class="container-scroll">

    <div 
      v-for="({ key, value }, index) of chunk"
      :key="`${key}_${index}`"
      class="item"
    >
      <span class="item__key" v-text="key"/>
      <span class="item__text" v-text="value"/>
      <div class="item__icons">
        <Icon type="edit" @click="$emit('edit', { key, value })" :size="16"/>
        <Icon type="trash" @click="$emit('remove', { key })" :size="16"/>
      </div>
    </div>
    
  </div>
</template>

<script>
import Icon from '../app/Icon';

export default {
  name: 'DisplayVariables',

  components: {
    Icon,
  },

  props: {
    chunk: Array,
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
  grid-template-columns: minmax(170px, 1fr);
  gap: 10px;
  background: var(--main-bg-color);
  border-radius: 10px;
  width: auto;

  .item {
    margin-top: 5px;
    padding: 10px;
    background: var(--content-bg-color);
    border-radius: 10px;
    position: relative;
    overflow-wrap: anywhere;

    &__key {
      position: absolute;
      bottom: calc(100% - 0.5em);
      font-size: 12px;
      line-height: 1;
      color: var(--special-color);
      left: 10px;
    }
    &__icons {
      float: right;
      display: flex;
      margin-bottom: auto;
      margin-left: auto;
      .icon {
        color: var(--text-color);
        opacity: .33;
        margin-top: auto;
        cursor: pointer;
        &:nth-child(1) {
          margin-right: 5px;
        }
        &:hover {
          color: var(--special-color);
          opacity: 1;
        }
      }
    }
  }
}
</style>