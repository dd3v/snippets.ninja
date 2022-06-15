<template>
  <aside class="left-block" :class="{ active: sidebar }">
    <main-navigation :items="menu" v-model="conditions.snippets" />
    <tag-navigation :items="tags" v-model="conditions.tags" />
    <section class="app-tools">
      <u-button circle ariaLabel="Theme" @click="theme = toggleTheme(theme)">
        <u-icon :name="theme == 'light' ? 'moon-inv' : 'sun-inv'" />
      </u-button>
    </section>
  </aside>
  <section class="middle-block" :class="{ hide: snippet }">
    <snippet-tools
      v-model:sort="conditions.sort"
      v-model:term="conditions.term"
      @snippet:create="createSnippet"
      @navigation:toggle="sidebar = !sidebar"
    />
    <u-scroll @scroll:end="paginate" :limit="100" ref="scroll">
      <snippet-list :items="snippets" @snippets:delete="deleteSnippet" v-model:selected="snippet" />
    </u-scroll>
  </section>
  <section class="right-block" :class="{ hide: !snippet }">
    <code-editor
      v-model="snippet"
      :theme="theme"
      @snippet:delete="deleteSnippet"
      @snippet:close="snippet = false"
      v-if="snippet"
    />
  </section>
  <u-notify />
</template>

<script setup>
import { onMounted, reactive, ref, toRaw, watch, onErrorCaptured, inject } from 'vue';
import { installTheme, toggleTheme } from '@/helpers/themeSwitcher';
import SnippetList from '@/components/app/SnippetList.vue';
import CodeEditor from '@/components/app/editor/CodeEditor.vue';
import TagNavigation from '@/components/app/TagNavigation.vue';
import MainNavigation from '@/components/app/MainNavigation.vue';
import SnippetTools from '@/components/app/SnippetTools.vue';
import initStorage from '@/storage/db/idb';
import menu from '@/data/menu';
import { snippetEntity } from '@/data/snippetEntity';
import SnippetStorage from '@/storage/snippet';

const notify = inject('notify');
const sidebar = ref(false);
const theme = ref('');
const defaultConditions = {
  snippets: 'all',
  tags: [],
  sort: 'desc',
  term: '',
};
const conditions = reactive({ ...defaultConditions });
const tags = ref([]);
const snippet = ref(false);
const snippets = ref([]);
const scroll = ref({});

try {
  await initStorage();
} catch (e) {
  notify.error(e);
}

const snippetStorage = new SnippetStorage();

const getTags = async () => {
  try {
    tags.value = await snippetStorage.tags();
  } catch (e) {
    notify.error(e);
  }
};

const createSnippet = async () => {
  try {
    const response = await snippetStorage.create(snippetEntity);
    snippets.value.unshift(...response);
    snippet.value = snippets.value[0] ?? false;
    scroll.value.scrollUp();
    // reset filter conditions
    Object.assign(conditions, defaultConditions);
  } catch (e) {
    notify.error(e);
  }
};

const deleteSnippet = async (entity) => {
  try {
    await snippetStorage.softDelete(entity);
    snippets.value.splice(snippets.value.map((item) => item.id).indexOf(entity.id), 1);
    snippet.value = null;
    getTags();
  } catch (e) {
    notify.error(e);
  }
};

const paginate = async (skip) => {
  try {
    snippets.value.push(...(await snippetStorage.search(toRaw(conditions), skip, 100)));
  } catch (e) {
    notify.error(e);
  }
};

watch(
  snippet,
  async (current, previous) => {
    if (Object.is(current, previous) && current.id === previous.id) {
      const data = toRaw(snippet.value);
      await snippetStorage.update(data);
      getTags();
    }
  },
  {
    deep: true,
  }
);
watch(
  conditions,
  async () => {
    snippets.value = await snippetStorage.search(toRaw(conditions));
  },
  {
    deep: true,
    immediate: true,
  }
);

onMounted(() => {
  theme.value = installTheme();
  getTags();
});

onErrorCaptured((e) => {
  notify.error(e);
});
</script>

<style>
html,
body {
  font-family: 'Rubik', sans-serif;
  font-size: 14px;
  font-weight: 400;
  padding: 0;
  margin: 0;
  height: 100%;
  overflow: hidden;
  color: var(--default-text-color);
  background: var(--body-bg);
}

#app {
  display: flex;
  height: 100%;
  width: 100%;
}

.left-block {
  display: flex;
  flex-direction: column;
  max-width: 210px;
  min-width: 210px;
  transition: margin 0.3s;
  background: var(--aside-bg-color);
  height: 100%;
}

.left-block.active {
  margin-left: -210px;
}

.middle-block {
  display: flex;
  flex-direction: column;
  min-width: 300px;
  z-index: 1;
  height: 100%;
  color: var(--default-text-color);
  background: var(--body-bg);
  border-right: var(--snippets-border-right);
  border-left: var(--snippets-border-left);
}
.right-block {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: var(--body-bg);
}

.app-tools {
  padding: 5px;
}

/** overwrite  **/

:focus-visible {
  outline: none;
}

::-webkit-scrollbar-button {
  display: none;
}
::-webkit-scrollbar-corner {
  background: transparent;
}

.cm-focused {
  outline: none !important;
}

/** responsive things **/

.m-button {
  display: none;
}

@media (max-width: 650px) {
  .left-block.active {
    margin-left: 0;
  }
  .left-block {
    margin-left: -210px;
  }

  .hide {
    display: none;
  }
  .middle-block {
    width: 100%;
  }
  .m-button {
    display: inline-flex;
  }
}
</style>
