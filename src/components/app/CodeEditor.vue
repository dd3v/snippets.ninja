<template>
  <div class="code-editor-wrapper">
    <div class="editor-tools input-group">
      <button class="btn btn-circle"><ui-icon icon="heart-empty" /></button>
      <input type="text" name="name" value="Hello world" id="name" class="input-inv" />
      <button class="btn btn-circle"><ui-icon icon="sliders" /></button>
    </div>
    <label for="editor">
      <textarea id="editor">hello</textarea>
    </label>

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
  props: {
    snippet: Object,
  },
  setup() {},
  mounted() {
    const codeMirror = CodeMirror.fromTextArea(
      document.getElementById('editor'),
      {
        mode: 'javascript',
        lineNumbers: true,
        // styleActiveLine: true,
        // matchBrackets: true,
      },
    );
    codeMirror.setOption('theme', 'neo');
    // codeMirror.setSize('100%', '100%');

    console.log(codeMirror);
  },
};
</script>
<style scoped>
.code-editor-wrapper {
  width: 100%;
}
.status-bar {
  background: #fafafa;
}

#name {
flex-grow: 1;
font-size: 18px;
color: inherit;
padding: 0px 5px 0px 5px;
}

.editor-tools {

}

.editor-tools input {

}
</style>
