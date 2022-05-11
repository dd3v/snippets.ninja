<template>
  <div class="editor-tools input-group">
    <u-dropdown icon="sliders" dropleft circle>
      <ul class="dropdown-list">
        sdfsdf
      </ul>
    </u-dropdown>
    <u-button><u-icon icon="heart-empty" color="var(--color-red)" /></u-button>
    <input type="text" name="name" value="Hello world" id="name" class="input-inv" />
    <u-dropdown icon="sliders" dropleft circle>
      <ul class="dropdown-list">
        <li>
          <u-button><u-icon icon="code" /> Editor settings</u-button>
        </li>
        <li>
          <u-button><u-icon icon="trash-empty" color="var(--color-red)" /> Delete</u-button>
        </li>
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
import UButton from '../ui/UButton.vue';

export default {
  components: { UDropdown, UButton },
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
