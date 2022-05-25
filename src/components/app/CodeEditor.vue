<template>
  <div class="editor-tools-container">
    <div class="item m-button">
      <u-button circle @click="$emit('snippet:close')">
        <u-icon icon="left-small" />
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
        <u-icon :icon="snippet.favorite ? 'heart' : 'heart-empty'" />
      </u-button>
    </div>
    <div class="item">
      <u-dropdown icon="cloud" dropleft circle> ... it's coming soon 🚀 </u-dropdown>
    </div>
    <div class="item">
      <u-button circle @click="$emit('snippet:delete', snippet)">
        <u-icon icon="trash-empty" />
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
    @update="handleState"
  />
  <editor-status-bar :state="state">
    <u-button @click="modal.open()"> <u-icon icon="code" />{{ snippet.language }} </u-button>
    <u-modal header="Language mode" ref="modal">
      <language-selector :languages="languages" v-model="snippet.language" />
    </u-modal>
  </editor-status-bar>
</template>
<script>
import { Codemirror } from 'vue-codemirror';
import { computed, ref, watch } from 'vue';
import { languages } from '@codemirror/language-data';

import { githubLight } from '@ddietr/codemirror-themes/theme/github-light';
import { githubDark } from '@ddietr/codemirror-themes/theme/github-dark';
import EditorStatusBar from './EditorStatusBar.vue';
import LanguageSelector from './LanguageSelector.vue';

export default {
  name: 'CodeEditor',
  emits: ['update:modelValue', 'snippet:close', 'snippet:delete'],
  components: {
    Codemirror,
    LanguageSelector,
    EditorStatusBar,
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
    const snippet = computed({
      get: () => props.modelValue,
      set: (value) => emit('update:modelValue', value),
    });
    const extensions = ref([]);
    const themes = {
      light: githubLight,
      dark: githubDark,
    };

    const editorSettings = {
      theme: themes[props.theme],
      language: null,
    };

    const state = ref({});
    const modal = ref(null);

    const handleState = (e) => {
      const { ranges } = e.state.selection;
      state.value.selected = ranges.reduce((plus, range) => plus + range.to - range.from, 0);
      state.value.cursor = ranges[0].anchor;
      state.value.length = e.state.doc.length;
      state.value.lines = e.state.doc.lines;
    };

    const handleLanguageUpdate = (language) => {
      const mode = languages.find((item) => item.name === language) ?? false;

      if (mode === false) {
        snippet.value.language = 'Text';
        extensions.value = [themes[props.theme]];
        return;
      }
      mode.load().then((extension) => {
        editorSettings.language = extension;
        extensions.value = Object.values(editorSettings);
        snippet.value.language = mode.name;
      });

      modal.value?.close();
    };

    watch(
      () => snippet.value.language,
      (value) => {
        console.log(value);
        handleLanguageUpdate(value);
      },
      { immediate: true }
    );

    watch(
      () => props.theme,
      (value) => {
        editorSettings.theme = themes[value];
        extensions.value = Object.values(editorSettings);
      }
    );

    return {
      snippet,
      extensions,
      state,
      handleState,
      modal,
      languages,
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
