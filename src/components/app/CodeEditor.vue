<template>
  <div class="editor-tools-container">
    <div class="item m-button">
      <u-button circle @click="$emit('snippet:close')">
        <u-icon name="left-small" />
      </u-button>
    </div>
    <div class="item-center">
      <u-input
        type="text"
        v-model="snippet.title"
        variant="invisible"
        name="snippet-title"
        placeholder="Untitled"
        @blur="snippet.title = snippet.title.length === 0 ? 'Untitled' : snippet.title"
      />
    </div>
    <div class="item">
      <u-button circle @click="snippet.favorite = Number(!snippet.favorite)">
        <u-icon :name="snippet.favorite ? 'heart' : 'heart-empty'" />
      </u-button>
    </div>
    <div class="item">
      <u-dropdown icon="cloud" dropleft circle> ... it's coming soon 🚀 </u-dropdown>
    </div>
    <div class="item">
      <u-button circle @click="$emit('snippet:delete', snippet)">
        <u-icon name="trash-empty" />
      </u-button>
    </div>
  </div>
  <div class="tag-list-container">
    <u-tag-input :max="5" placeholder="Enter a tag" v-model="snippet.tags" />
  </div>
  <codemirror
    v-model="snippet.code"
    :extensions="extensions"
    :style="{ height: '100%', overflow: 'scroll' }"
    :tabSize="snippet.editor_options.indent_size"
    @update="handleState"
  />
  <editor-status-bar :state="state">
    <u-button @click="modal.open()"> <u-icon name="code" />{{ snippet.language }} </u-button>
    <u-modal header="Language mode" ref="modal">
      <language-selector :languages="languages" v-model="snippet.language" />
    </u-modal>
    <editor-indent v-model="snippet.editor_options.indent_size" />
  </editor-status-bar>
</template>
<script>
import { Codemirror } from 'vue-codemirror';
import { computed, ref, watch } from 'vue';
import { languages } from '@codemirror/language-data';

import { githubLight } from '@ddietr/codemirror-themes/theme/github-light';
import { githubDark } from '@ddietr/codemirror-themes/theme/github-dark';
import { markdown } from '@codemirror/lang-markdown';

import EditorStatusBar from '@/components/app/EditorStatusBar.vue';
import LanguageSelector from '@/components/app/LanguageSelector.vue';
import EditorIndent from '@/components/app/EditorIndent.vue';
import modelWrapper from '@/composable/modelWrapper';

export default {
  name: 'CodeEditor',
  emits: ['update:modelValue', 'snippet:close', 'snippet:delete'],
  components: {
    Codemirror,
    LanguageSelector,
    EditorStatusBar,
    EditorIndent,
  },
  props: {
    modelValue: {
      type: Object,
      default: () => ({}),
    },
    theme: {
      type: String,
    },
  },
  setup(props, { emit }) {
    const snippet = modelWrapper(props, emit);
    const themes = {
      light: githubLight,
      dark: githubDark,
    };
    const indentSize = ref(2);
    const defaultLanguage = markdown();
    const state = ref({});
    const modal = ref(null);
    const extensions = ref([]);
    const theme = computed(() => themes[props.theme]);
    const language = ref(defaultLanguage);

    const handleState = (e) => {
      const { ranges } = e.state.selection;
      state.value.selected = ranges.reduce((plus, range) => plus + range.to - range.from, 0);
      state.value.cursor = ranges[0].anchor;
      state.value.length = e.state.doc.length;
      state.value.lines = e.state.doc.lines;
    };

    const loadLanguageMode = (value) => {
      const mode = languages.find((item) => item.name === value) ?? false;
      if (mode === false) {
        snippet.value.language = 'Markdown';
        language.value = defaultLanguage;
        return;
      }
      mode.load().then((extension) => {
        snippet.value.language = mode.name;
        language.value = extension;
      });
      modal.value?.close();
    };

    watch(
      () => snippet.value.language,
      (value) => {
        loadLanguageMode(value);
      },
      { immediate: true }
    );

    watch([theme, language], () => {
      extensions.value = [theme.value, language.value];
    });

    return {
      snippet,
      extensions,
      state,
      handleState,
      modal,
      languages,
      indentSize,
    };
  },
};
</script>
<style scoped>
.editor-tools-container {
  display: flex;
  align-items: center;
  background: transparent;
}

.tag-list-container {
  padding: 5px;
}

.editor-tools-container .item {
  padding: 5px;
}

.editor-tools-container .item-center {
  flex-grow: 1;
  margin: 0px 2px 0px 2px;
}

input[type='text'],
input[type='text']::placeholder {
  font-size: 16px;
}
</style>
