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
        placeholder="Snippet title"
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
import { computed, ref, watch, shallowRef } from 'vue';
import { languages } from '@codemirror/language-data';

// import {githubLight} from '@ddietr/codemirror-themes/theme/github-light'
import { githubDark } from '@ddietr/codemirror-themes/theme/github-dark';

import UDropdown from '../base/UDropdown.vue';
import UButton from '../base/UButton.vue';
import UTagInput from '../base/UTagInput.vue';
import UModal from '../base/UModal.vue';
import LanguageSelector from './LanguageSelector.vue';
import UInput from '../base/UInput.vue';
import EditorStatusBar from './EditorStatusBar.vue';

export default {
  name: 'CodeEditor',
  emits: ['update:modelValue', 'snippet:close', 'snippet:delete'],
  components: {
    Codemirror,
    UDropdown,
    UButton,
    UTagInput,
    UModal,
    LanguageSelector,
    UInput,
    EditorStatusBar,
  },
  props: {
    modelValue: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props, { emit }) {
    const state = ref({});
    const modal = ref(null);
    const extensions = shallowRef([]);

    const handleState = (e) => {
      const { ranges } = e.state.selection;
      state.value.selected = ranges.reduce((plus, range) => plus + range.to - range.from, 0);
      state.value.cursor = ranges[0].anchor;
      state.value.length = e.state.doc.length;
      state.value.lines = e.state.doc.lines;
    };
    const snippet = computed({
      get: () => props.modelValue,
      set: (value) => emit('update:modelValue', value),
    });

    const handleLanguageUpdate = (language) => {
      let mode = languages.find((item) => item.name === language) ?? false;
      if (mode === false) {
        mode = languages.find((item) => item.name === 'Markdown');
      }

      mode.load().then((extension) => {
        extensions.value = [githubDark, extension];
      });
      snippet.value.language = mode.name;
      modal.value?.close();
    };

    watch(
      () => snippet.value.language,
      (value) => {
        handleLanguageUpdate(value);
      },
      { immediate: true }
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

.editor-tools-container .item-center input[type='text'] {
  font-size: 16px;
}
</style>
