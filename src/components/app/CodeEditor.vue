<template>
  <div class="editor-tools input-group">
    <u-button>
      <u-icon icon="heart-empty" color="var(--color-red)" fontSize="18px" />
    </u-button>
    <label for="t">
      <input type="text" name="name" v-model="snippet.title" />
    </label>
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
  <codemirror
    v-model="snippet.code"
    :extensions="extensions"
    placeholder="Code gose here..."
    :style="{ height: '100%' }"
    theme="cobalt"
    @update="handleStateUpdate"
  />
  <div class="status-bar">
    <u-button @click="lang">
      {{ snippet.language }}
    </u-button>
    <code-editor-state
      :length="state.length"
      :lines="state.lines"
      :cursor="state.cursor"
      :selected="state.selected"
    />
  </div>
  <u-modal header="Language mode" ref="language">
    <language-selector :languages="languages" v-model="snippet.language" />
  </u-modal>
</template>
<script>
import { Codemirror } from 'vue-codemirror';
import { computed, ref } from 'vue';
import { languages } from '@codemirror/language-data';
import UDropdown from '../ui/UDropdown.vue';
import UButton from '../ui/UButton.vue';
import UTagInput from '../ui/UTagInput.vue';
import CodeEditorState from './CodeEditorState.vue';
import UModal from '../ui/UModal.vue';
import LanguageSelector from './LanguageSelector.vue';

export default {
  name: 'CodeEditor',
  emits: ['update:modelValue'],
  components: {
    Codemirror,
    UDropdown,
    UButton,
    UTagInput,
    UModal,
    CodeEditorState,
    LanguageSelector,
  },
  props: {
    modelValue: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props, { emit }) {
    // const snippet = ref({title: ''});

    const state = ref({});
    const language = ref(null);

    const handleStateUpdate = (e) => {
      const { ranges } = e.state.selection;
      state.value.selected = ranges.reduce((plus, range) => plus + range.to - range.from, 0);
      state.value.cursor = ranges[0].anchor;
      state.value.length = e.state.doc.length;
      state.value.lines = e.state.doc.lines;
    };
    const extensions = [];

    console.log(languages);

    const snippet = computed({
      get: () => props.modelValue,
      set: (value) => emit('update:modelValue', value),
    });

    const lang = () => {
      language.value.open();
      console.log(language.value);
    };

    return { snippet, extensions, state, handleStateUpdate, language, lang, languages };
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

.status-bar {
  display: inline-flex;
  justify-content: space-between;
  
}
</style>
