<template>
  <div class="snippet-list-wrapper" ref="scroll">
    <div class="snippet-list">
      <TransitionGroup
        tag="ul"
        :css="false"
        @before-enter="onBeforeEnter"
        @enter="onEnter"
        @leave="onLeave"
      >
        <li
          v-for="snippet in items"
          :key="snippet.id"
          :class="{ active: current?.id === snippet.id }"
        >
          <snippet-item :snippet="snippet" @click="handleSelect(snippet.id)" />
        </li>
      </TransitionGroup>
    </div>
  </div>
</template>
<script>
import { onMounted, onUnmounted, ref } from 'vue';
import gsap from 'gsap';
import SnippetItem from './SnippetItem.vue';

export default {
  name: 'SnippetList',
  emits: ['snippet:select', 'snippets:more'],
  components: { SnippetItem },
  props: {
    items: {
      type: Array,
    },
  },
  setup(props, { emit }) {
    const current = ref(null);
    const scroll = ref(null);
    const handleSelect = (id) => {
      current.value = props.items.find((item) => item.id === id);
      emit('snippet:select', current.value);
    };

    // gsap animation stuff
    const onBeforeEnter = (el) => {
      // eslint-disable-next-line no-param-reassign
      el.style.opacity = 0;
      // eslint-disable-next-line no-param-reassign
      el.style.height = '70px';
    };
    const onEnter = (el, done) => {
      gsap.to(el, {
        opacity: 1,
        height: '70px',
        delay: el.dataset.index * 0.15,
        onComplete: done,
      });
    };
    const onLeave = (el, done) => {
      gsap.to(el, {
        opacity: 0,
        height: 0,
        delay: el.dataset.index * 0.15,
        onComplete: done,
      });
    };

    const handleScroll = () => {
      const el = scroll.value;
      console.log(el.offsetHeight);
      console.log(el.scrollTop);
      console.log(el.scrollHeight);

      if (el.offsetHeight + el.scrollTop >= el.scrollHeight) {
        console.warn('GO!');
        emit('snippets:more');
      }
    };

    onMounted(() => {
      scroll.value.addEventListener('scroll', handleScroll);
    });

    onUnmounted(() => {
      // scroll.value.removeEventListener('scroll', handleScroll);
    });

    return { handleSelect, current, scroll, onBeforeEnter, onEnter, onLeave };
  },
};
</script>
<style scoped>
.snippet-list-wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 5px 5px 5px 5px;
  overflow-y: scroll;
  scroll-behavior: smooth;
}

.snippet-list {
  margin: 10px 0;
}

.snippet-list li {
  border-bottom: 1px solid hsl(240deg 2% 88% / 44%);
}

.snippet-list li:hover {
  border-radius: 5px;
  background: hsl(264deg 10% 14% / 12%);
  color: #2b292e;
}

.active {
  border-radius: 5px;
  background: hsl(264deg 10% 14% / 12%);
  color: #2b292e;
}

.snippet-list li:last-child {
  border-bottom: none;
}
</style>
