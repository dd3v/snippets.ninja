<template>
  <div class="editor-tools">
    <div class="m-button">
      <u-button variant="circle" @click="$emit('snippet:close')" ariaLabel="Close Snippet">
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
    <u-button
      variant="circle"
      @click="snippet.favorite = Number(!snippet.favorite)"
      ariaLabel="Favorive"
    >
      <u-icon :name="snippet.favorite ? 'heart' : 'heart-empty'" />
    </u-button>
    <u-button variant="circle" @click="$emit('snippet:delete', snippet)" ariaLabel="Delete Snippet">
      <u-icon name="trash-empty" />
    </u-button>
  </div>
  <div class="tag-list">
    <u-tag-input :max="5" placeholder="Enter a tag" v-model="snippet.tags" />
  </div>
  <code-mirror v-model="snippet.code" :language="language" :theme="theme" @state="handleState" />
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

const snippet = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});

const handleState = (stateEvent) => {
  state.value = stateEvent;
};

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
  display: inline-flex;
  gap: 10px;
  padding: 5px;
}
.snippet-title {
  font-size: 16px;
  width: 75%;
  color: var(--editor-title-color);
}

.tag-list {
  padding: 5px;
}
</style>
