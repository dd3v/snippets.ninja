<template>
  <div class="editor-tools">
    <div class="m-button">
      <u-button circle @click="$emit('snippet:close')" ariaLabel="Close Snippet">
        <u-icon name="left-small" />
      </u-button>
    </div>
    <u-input
      v-model="snippet.title"
      variant="invisible"
      name="title"
      class="snippet-title"
      @blur="snippet.title = snippet.title.length === 0 ? 'Untitled' : snippet.title"
    />
    <u-button circle @click="snippet.favorite = Number(!snippet.favorite)" ariaLabel="Favorive">
      <u-icon :name="snippet.favorite ? 'heart' : 'heart-empty'" />
    </u-button>
    <u-button circle @click="$emit('snippet:delete', snippet)" ariaLabel="Delete Snippet">
      <u-icon name="trash-empty" />
    </u-button>
  </div>
  <div class="tag-list">
    <u-tag-input :max="5" placeholder="Enter a tag" v-model="snippet.tags" />
  </div>
  <codemirror
    v-model="snippet.code"
    :extensions="extensions"
    :style="{ height: '100%', overflow: 'scroll' }"
    :tabSize="snippet.editor_options.indent_size"
    @update="handleState"
  />
  <ul class="status-bar">
    <li>
      <u-button @click="modal.open()" ariaLabel="Language mode">
        <u-icon name="code" /> {{ snippet.language }}
      </u-button>
    </li>
    <li><editor-indent v-model="snippet.editor_options.indent_size" /></li>
    <li>Cursor: {{ state.cursor }}</li>
    <li>Length: {{ state.length }}</li>
    <li>Selected: {{ state.selected }}</li>
  </ul>
  <u-modal ref="modal">
    <template #header> Language mode </template>
    <template #body>
      <language-mode :items="languages" v-model="snippet.language" @change="modal.close()" />
    </template>
  </u-modal>
</template>
<script setup>
import { computed, ref, watch } from 'vue';
import { Codemirror } from 'vue-codemirror';
import LanguageMode from '@/components/app/editor/LanguageMode.vue';
import EditorIndent from '@/components/app/editor/EditorIndent.vue';
import { languages } from '@codemirror/language-data';
import { githubLight } from '@ddietr/codemirror-themes/theme/github-light';
import { githubDark } from '@ddietr/codemirror-themes/theme/github-dark';
import { markdown } from '@codemirror/lang-markdown';

const emit = defineEmits(['snippet:close', 'snippet:delete', 'update:modelValue']);
const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({}),
  },
  theme: {
    type: String,
  },
});
const themes = {
  light: githubLight,
  dark: githubDark,
};
const defaultLanguage = markdown();
const theme = computed(() => themes[props.theme]);
const language = ref(defaultLanguage);
const state = ref({});
const modal = ref(null);
const extensions = ref([]);

const snippet = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});

const handleState = (e) => {
  const { ranges } = e.state.selection;
  state.value.selected = ranges.reduce((plus, range) => plus + range.to - range.from, 0);
  state.value.cursor = ranges[0].anchor;
  state.value.length = e.state.doc.length;
};

watch(
  () => snippet.value.language,
  async (languageMode) => {
    const mode = languages.find((item) => item.name === languageMode) ?? false;
    if (mode === false) {
      snippet.value.language = 'Markdown';
      language.value = defaultLanguage;
      return;
    }
    snippet.value.language = mode.name;
    language.value = await mode.load();
  },
  { immediate: true }
);

watch([theme, language], () => {
  extensions.value = [theme.value, language.value];
});
</script>
<style scoped>
.status-bar {
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  font-size: 12px;
  height: 20px;
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.editor-tools {
  display: inline-flex;
  gap: 10px;
  padding: 5px;
}
.snippet-title {
  font-size: 16px;
  width: 100%;
  color: var(--editor-title-color);
}

.tag-list {
  padding: 5px;
}
</style>
