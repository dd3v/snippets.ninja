<template>
  <div class="editor-tools input-group">
    <u-dropdown icon="sliders" circle>
      <ul>
        <li>1</li>
        <li>2</li>
      </ul>
    </u-dropdown>
    <u-button><u-icon icon="heart-empty" color="red" /></u-button>
    <input type="text" name="name" value="Hello world" id="name" class="input-inv" />
    <u-dropdown icon="sliders" dropleft circle>
      <ul>
        <li><u-button>Editor settings</u-button></li>
        <li><u-button>Delete</u-button></li>
      </ul>
    </u-dropdown>
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
import UDropdown from '../ui/UDropdown.vue';

export default {
  components: { UDropdown },
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
