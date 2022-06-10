<template>
  <aside class="left-block" :class="{ active: sidebar }">
    <main-navigation :items="menu" v-model="conditions.snippets" />
    <tag-navigation :items="tags" v-model="conditions.tags" />
    <section>
      <u-button
        circle
        ariaLabel="Theme"
        @click="theme = setupTheme(theme === 'light' ? 'dark' : 'light')"
      >
        <u-icon :name="theme == 'light' ? 'moon-inv' : 'sun-inv'" />
      </u-button>
    </section>
  </aside>
  <section class="middle-block" :class="{ hide: snippet }">
    <snippet-list-toolbar
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
// import faker from '@faker-js/faker';
import setupTheme from '@/helpers/themeSwitcher';
import initStorage from './storage/db/idb';
import menu from './data/menu';
import { snippetEntity } from './data/snippetEntity';
import SnippetList from './components/app/SnippetList.vue';
import CodeEditor from './components/app/editor/CodeEditor.vue';
import TagNavigation from './components/app/TagNavigation.vue';
import MainNavigation from './components/app/MainNavigation.vue';
import SnippetListToolbar from './components/app/SnippetListToolbar.vue';
import SnippetStorage from './storage/snippet';

const notify = inject('notify');
const theme = ref('');
const sidebar = ref(false);
const defaultConditions = {
  snippets: 'all',
  tags: [],
  sort: 'desc',
  term: '',
};
const tags = ref([]);
const snippet = ref(false);
const snippets = ref([]);
const scroll = ref({});

await initStorage();
const snippetStorage = new SnippetStorage();
const conditions = reactive({ ...defaultConditions });

const createSnippet = async () => {
  try {
    const response = await snippetStorage.create(snippetEntity);
    Object.assign(conditions, defaultConditions);
    snippets.value.unshift(...response);
    snippet.value = snippets.value[0] ?? false;
    scroll.value.scrollUp();
  } catch (e) {
    notify.error(e);
  }
};

const deleteSnippet = async (value) => {
  try {
    await snippetStorage.softDelete(value);
    snippets.value.splice(snippets.value.map((item) => item.id).indexOf(value.id), 1);
    snippet.value = null;
  } catch (e) {
    notify.error(e);
  }
};

const loadTags = async () => {
  try {
    const response = await snippetStorage.tags();
    tags.value = response.map((item) => item.tags);
    tags.value.sort();
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
      tags.value.push(...data.tags.filter((item) => !tags.value.includes(item)));
      tags.value.sort();
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
  theme.value = setupTheme(localStorage.getItem('theme') ?? 'light');
  loadTags();
});

onErrorCaptured((e) => {
  notify.error(e);
});
</script>

<style>
#app {
  display: flex;
  height: 100%;
}

.left-block {
  display: flex;
  flex-direction: column;
  max-width: 210px;
  min-width: 210px;
  height: 100%;
  padding: 5px;
  transition: margin 0.3s;
  background: var(--aside-bg-color);
}

.left-block.active {
  margin-left: -220px;
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

/** responsive things **/

.m-button {
  display: none;
}

@media (max-width: 650px) {
  .left-block.active {
    margin-left: 0;
  }
  .left-block {
    margin-left: -220px;
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
