<template>
  <div class="code-editor-wrapper">
    <div id="editor">hello</div>
  </div>
</template>
<script>
import CodeFlask from 'codeflask';

export default {
  name: 'CodeEditor',
  setup() {},
  mounted() {
    const editorElem = document.getElementById('editor');
    const flask = new CodeFlask(editorElem, {
      language: 'js',
      lineNumbers: true,
    });
    console.log(flask);
  },
};
</script>
<style scoped>
.code-editor-wrapper {
  width: 100%;
}
</style>
