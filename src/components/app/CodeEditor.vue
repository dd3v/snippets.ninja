<template>
  <div class="code-editor-wrapper">
    <label for="name">
      <input type="text" name="name">
    </label>
    <textarea id="editor">hello</textarea>
    <div class="status-bar">
      hello
    </div>
  </div>
</template>
<script>
import CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/neo.css';
import 'codemirror/theme/blackboard.css';
import 'codemirror/addon/scroll/simplescrollbars';
import 'codemirror/addon/selection/active-line';
import 'codemirror/addon/scroll/simplescrollbars.css';

export default {
  name: 'CodeEditor',
  setup() {},
  mounted() {
    const codeMirror = CodeMirror.fromTextArea(document.getElementById('editor'), {
      mode: 'javascript',
      lineNumbers: true,
    });
    // codeMirror.setSize('100%', '100%');

    console.log(codeMirror);
  },
};
</script>
<style scoped>
.code-editor-wrapper {
  width: 100%;
  border: 1px solid red;
}
.status-bar {
  background: black;
}

</style>
