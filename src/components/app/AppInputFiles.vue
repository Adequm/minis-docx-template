<template>
  <form 
    @submit.prevent
    @drop.stop.prevent="drop"
    @dragenter.prevent
    @dragover.prevent
  >
    <input 
      ref="input" 
      type="file" 
      :name="`files_${id}`" 
      :id="`files_${id}`" 
      :multiple="multiple"
      :allowdirs="allowdirs"
      :directory="directory"
      :webkitdirectory="webkitdirectory"
      @change="$emit('upload', $event)" 
    />

    <label :for="`files_${id}`">
      <Icon :type="icon"/>
      <span v-text="placeholder"/>
    </label>
  </form>
</template>

<script>
import Icon from './Icon';

export default {
  name: 'AppInputFiles',

  components: {
    Icon,
  },

  props: {
    id: String,
    placeholder: String,
    icon: String,
    multiple: Boolean,
    allowdirs: Boolean,
    directory: Boolean,
    webkitdirectory: Boolean,
  },

  methods: {
    focus() {
      this.$refs.input.focus();
    },

    drop(event) {
      if ('getFilesAndDirectories' in event.dataTransfer) {
        console.log('start')
        event.dataTransfer.getFilesAndDirectories().then(console.log);
      }
    }
  },  
};
</script>

<style lang="scss" scoped>
form {
  width: 100%;
  height: 100%;
  position: relative;
  font-size: 14px;
  border-radius: inherit;
  box-sizing: border-box;
  display: flex;
  box-sizing: border-box;
  background: var(--main-bg-color);
  border-radius: 10px;

  input { display: none }
  input:focus + label {
    outline: 1px solid var(--special-color);
  }
  input + label {
    width: inherit;
    resize: none;
    margin: 0;
    background: none;
    border: none;
    outline: none;
    padding: 15px;
    padding-right: 3em;
    box-sizing: border-box;
    border-radius: inherit;
    color: var(--text-color);
    font-size: inherit;
    font-family: inherit;
    cursor: pointer;
    line-height: 1.2;
    span {
      opacity: .5;
    }
    &:not(:focus):hover {
      outline: 1px solid var(--text-color);
    }
    &:focus {
      outline: 1px solid var(--special-color);
    }
  }
  input + label .icon {
    position: absolute;
    right: 0;
    top: 0;
    height: calc(100% - 10px);
    width: 30px;
    border: none;
    outline: none;
    margin: 5px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: var(--special-color);
    color: var(--text-color);
    &:not(:focus):hover {
      opacity: .5;
    }
    &:focus:not(:active) {
      background: var(--content-bg-color);
      outline: 1px solid var(--special-color);
    }
  }
}
</style>