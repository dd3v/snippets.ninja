<template>
  <div class="language-selector">
    <u-input
      type="text"
      name="language-selector"
      variant="default"
      placeholder="Language"
      v-model="keyword"
    />
    <div class="language-list">
      <ul>
        <li
          v-for="lang in filteredLanguages"
          :key="lang.name"
          :class="language == lang.name ? 'active' : ''"
        >
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
  </div>
</template>
<script>
import { computed, ref } from 'vue';

export default {
  name: 'LanguageSelector',
  props: {
    modelValue: {
      type: String,
    },
    languages: {
      type: Array,
    },
  },
  setup(props, { emit }) {
    const keyword = ref('');
    const language = computed({
      get: () => props.modelValue,
      set: (value) => {
        emit('update:modelValue', value);
        keyword.value = '';
      },
    });

    const filteredLanguages = computed(() =>
      props.languages.filter(
        (item) =>
          item.name.toLowerCase().includes(keyword.value.toLowerCase()) ||
          item.extensions.includes(keyword.value.toLowerCase())
      )
    );

    return { language, keyword, filteredLanguages };
  },
};
</script>
<style scoped>
ul {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
ul li {
  cursor: pointer;
  padding: 0px 5px 0px 5px;
}
ul li label {
  cursor: pointer;
  display: flex;
  width: 100%;
}

ul li:hover {
  border-radius: 5px;
  background: var(--primary-bg-color);
  color: var(--primary-text-color);
}

.language-selector {
  height: 80vh;
}

.language-list {
  overflow: scroll;
  height: 90%;
  margin: 10px 0px 30px 0px;
}

.language-list label [type='radio'] {
  display: none;
}

.language-list li.active {
  border-radius: 5px;
  background: var(--primary-bg-color);
  color: var(--primary-text-color);
}
</style>