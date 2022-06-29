<template>
  <div id="editor"></div>
</template>
<script setup>
import { basicSetup, EditorView } from 'codemirror';
import { keymap } from '@codemirror/view';
import { EditorState, Compartment } from '@codemirror/state';
import { indentWithTab } from '@codemirror/commands';
import { onMounted, watch } from 'vue';

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  language: {
    type: Object,
  },
  theme: {
    type: Object,
  },
});
const emit = defineEmits(['update:modelValue', 'state']);

let view;
const langaugeExt = new Compartment();
const themeExt = new Compartment();

const handleState = (e) => {
  const { ranges } = e.state.selection;
  return {
    selected: ranges.reduce((plus, range) => plus + range.to - range.from, 0),
    cursor: ranges[0].anchor,
    length: e.state.doc.length,
  };
};

const extensions = [
  basicSetup,
  keymap.of([indentWithTab]),
  EditorView.updateListener.of((viewUpdate) => {
    emit('state', handleState(viewUpdate));
    if (viewUpdate.docChanged) {
      emit('update:modelValue', viewUpdate.state.doc.toString());
    }
  }),
  langaugeExt.of([]),
  themeExt.of([]),
];

const initialState = EditorState.create({
  doc: props.modelValue || '',
  extensions,
});

onMounted(() => {
  view = new EditorView({
    state: initialState,
    parent: document.getElementById('editor'),
  });
  watch(
    () => props.modelValue,
    (newValue) => {
      if (newValue !== view.state.doc.toString()) {
        view.dispatch({
          changes: { from: 0, to: view.state.doc.length, insert: newValue || '' },
        });
      }
    }
  );
  watch(
    () => props.language,
    (newValue) => {
      view.dispatch({ effects: langaugeExt.reconfigure(newValue || []) });
    },
    {
      immediate: true,
    }
  );
  watch(
    () => props.theme,
    (newValue) => {
      view.dispatch({ effects: themeExt.reconfigure(newValue || []) });
    },
    {
      immediate: true,
    }
  );
});
</script>
<style scoped>
#editor {
  height: 100%;
  overflow: auto;
}
</style>
