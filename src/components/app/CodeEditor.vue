<template>
  <div class="editor-tools input-group">
    <u-button><u-icon icon="heart-empty" color="var(--color-red)" fontSize="18px" /></u-button>
    <input type="text" name="name" v-model="snippet.title" />
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
  <u-tag-input :max="5" placeholder="Enter a tag" v-model="snippet.tags" />
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
import { computed } from 'vue';

import UDropdown from '../ui/UDropdown.vue';
import UButton from '../ui/UButton.vue';
import UTagInput from '../ui/UTagInput.vue';

export default {
  name: 'CodeEditor',
  emits: ['update:modelValue'],
  components: { UDropdown, UButton, UTagInput },
  props: {
    modelValue: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props, { emit }) {
    // const snippet = ref({title: ''});

    const snippet = computed({
      get: () => props.modelValue,
      set: (value) => emit('update:modelValue', value),
    });

    return { snippet };
  },
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
input[type='text'] {
  background: transparent;
  border: none;
  font-family: inherit;
  font-size: 16px;
  flex-grow: 1;
}

input[type='text']:focus-visible {
  border: none;
  outline: none;
}
</style>
