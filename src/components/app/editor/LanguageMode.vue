<template>
  <div class="language-mode-wrapper">
    <u-input type="text" name="mode" variant="default" placeholder="Language" v-model="keyword" />
    <ul class="language-list">
      <li v-for="lang in languages" :key="lang.name" :class="{ active: language == lang.name }">
        <label :for="lang.name">
          <input
            type="radio"
            :id="lang.name"
            name="language"
            :value="lang.name"
            v-model="language"
          />
          <span>{{ lang.name }}</span>
        </label>
      </li>
    </ul>
  </div>
</template>
<script setup>
import { computed, ref } from 'vue';

const props = defineProps({
  modelValue: {
    type: String,
  },
  items: {
    type: Array,
  },
});
const emit = defineEmits(['update:modelValue']);
const keyword = ref('');
const language = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue', value);
    keyword.value = '';
  },
});
const languages = computed(() =>
  props.items.filter(
    (item) =>
      item.name.toLowerCase().includes(keyword.value.toLowerCase()) ||
      item.extensions.includes(keyword.value.toLowerCase())
  )
);
</script>
<style scoped>
.language-mode-wrapper {
  height: 80vh;
}

.language-list {
  display: flex;
  overflow: scroll;
  font-size: 12px;
  height: 90%;
  flex-direction: column;
  list-style-type: none;
  padding: 0;
  line-height: 20px;
  gap: 5px;
}

.language-list li {
  padding: 3px;
}

.language-list li:hover {
  border-radius: 5px;
  background: var(--primary-bg-color);
  color: var(--primary-text-color);
}

.language-list li.active {
  border-radius: 5px;
  background: var(--primary-bg-color);
  color: var(--primary-text-color);
}

.language-list label [type='radio'] {
  display: none;
}

.language-list label {
  cursor: pointer;
  display: flex;
  width: 100%;
  padding: 5px;
}
</style>
