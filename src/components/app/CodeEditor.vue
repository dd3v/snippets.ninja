<template>
  <div class="editor-tools">
    <div class="m-button">
      <u-button variant="circle" @click="$emit('snippet:close')" ariaLabel="Close Snippet">
        <u-icon name="left-small" />
      </u-button>
    </div>
    <div class="snippet-title">
      <u-input
        v-model="snippet.title"
        variant="invisible"
        name="title"
        @blur="snippet.title = snippet.title.length === 0 ? 'Untitled' : snippet.title"
      />
    </div>
    <div class="snippet-toolbar">
      <u-button variant="circle" @click="preview = !preview" v-if="isMarkdown">
        <u-icon :name="preview ? 'eye-off' : 'eye'" />
      </u-button>
      <u-button
        variant="circle"
        @click="snippet.favorite = Number(!snippet.favorite)"
        ariaLabel="Favorive"
      >
        <u-icon :name="snippet.favorite ? 'heart' : 'heart-empty'" />
      </u-button>
      <u-button
        variant="circle"
        @click="$emit('snippet:delete', snippet)"
        ariaLabel="Delete Snippet"
      >
        <u-icon name="trash-empty" />
      </u-button>
    </div>
  </div>
  <div class="tag-list">
    <u-tag-input :max="5" placeholder="Enter a tag" v-model="snippet.tags" />
  </div>
  <markdown-preview :source="snippet.code" v-if="isMarkdown && preview" />
  <code-mirror
    v-model="snippet.code"
    :language="language"
    :theme="theme"
    @state="handleState"
    v-else
  />
  <ul class="status-bar">
    <li>
      <u-button @click="modal.open()" ariaLabel="Language mode">
        <u-icon name="code" /> {{ snippet.language }}
      </u-button>
    </li>
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
import CodeMirror from '@/components/app/editor/CodeMirror.vue';
import MarkdownPreview from '@/components/app/editor/MarkdownPreview.vue';
import LanguageMode from '@/components/app/editor/LanguageMode.vue';
import { languages } from '@/helpers/languages';
import { githubLight } from '@ddietr/codemirror-themes/theme/github-light';
import { githubDark } from '@ddietr/codemirror-themes/theme/github-dark';

const emit = defineEmits(['snippet:close', 'snippet:delete', 'update:modelValue']);
const props = defineProps({
  modelValue: {
    type: Object,
    default: () => {},
  },
  theme: {
    type: String,
  },
});
const themes = {
  light: githubLight,
  dark: githubDark,
};
const theme = computed(() => themes[props.theme]);
const language = ref(null);
const state = ref({});
const modal = ref(null);
const preview = ref(false);
const snippet = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});
const handleState = (stateEvent) => {
  state.value = stateEvent;
};
const isMarkdown = computed({
  get: () => snippet.value.language.toLowerCase() === 'markdown',
});

watch(
  () => snippet.value.language,
  async (languageMode) => {
    const mode = languages.find((item) => item.name === languageMode) ?? false;
    language.value = mode === false ? [] : await mode.load();
  },
  { immediate: true }
);
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
  background: transparent;
}

.editor-tools {
  display: flex;
  align-items: center;
  padding: 5px;
}

.snippet-toolbar {
  display: flex;
  gap: 5px;
  align-items: center;
}

.snippet-title {
  flex-grow: 1;
}

.snippet-title input {
  font-size: 18px;
  color: var(--editor-title-color);
}

.tag-list {
  padding: 5px;
}
</style>
