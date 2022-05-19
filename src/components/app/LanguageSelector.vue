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
import { computed, ref } from '@vue/reactivity';
import UInput from '../core/UInput.vue';

export default {
  components: { UInput },
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
  overflow: scroll;
}
ul li {
  cursor: pointer;
  padding: 5px;
  width: auto;
}
ul li label {
  cursor: pointer;
  display: block;
  width: 100%;
}

ul li:hover {
  border-radius: 5px;
  background: hsl(264deg 10% 14% / 12%);
  color: #2b292e;
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
  background: hsl(264deg 10% 14% / 12%);
  color: #2b292e;
}
</style>