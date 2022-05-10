<template>
  <div class="editor-tools input-group">
    <ui-dropdown icon="sliders">
      <ul>
        <li>1</li>
        <li>2</li>
      </ul>
    </ui-dropdown>
    <button class="btn btn-circle">
      <ui-icon icon="heart-empty" color="red" />
    </button>
    <input type="text" name="name" value="Hello world" id="name" class="input-inv" />
    <ui-dropdown icon="sliders" dropleft>
      <ul>
        <li><button class="btn">Editor settings</button></li>
        <li><button class="btn">Delete</button></li>
      </ul>
    </ui-dropdown>
  </div>
  <label for="editor">
    <textarea id="editor">hello</textarea>
  </label>
</template>
<script>
import CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/neo.css';
import 'codemirror/theme/blackboard.css';
import 'codemirror/addon/scroll/simplescrollbars';
import 'codemirror/addon/selection/active-line';
import 'codemirror/addon/scroll/simplescrollbars.css';
import UiDropdown from '../ui/UiDropdown.vue';

export default {
  components: { UiDropdown },
  name: 'CodeEditor',
  props: {
    snippet: Object,
  },
  setup() {},
  mounted() {
    const codeMirror = CodeMirror.fromTextArea(document.getElementById('editor'), {
      mode: 'javascript',
      lineNumbers: true,
      // styleActiveLine: true,
      // matchBrackets: true,
    });
    codeMirror.setOption('theme', 'neo');
    // codeMirror.setSize('100%', '100%');

    console.log(codeMirror);
  },
};
</script>
<style scoped>
#name {
  flex-grow: 1;
  color: inherit;
  padding: 0px 5px 0px 5px;
}
</style>
