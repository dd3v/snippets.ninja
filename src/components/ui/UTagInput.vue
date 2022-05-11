<template>
  <div class="tag-input-wrapper">
    <div v-for="(tag, key) in tags" :key="key" class="tag-input-tag">
      <span>&times;</span>
      {{ tag }}
    </div>
    <label for="t">
      <input
        type="text"
        v-model="tag"
        placeholder="Tags"
        class="tag-input-text"
        @keyup.enter="addTag"
      />
    </label>
  </div>
</template>
<script>
import { ref } from '@vue/reactivity';

export default {
  props: {
    max: Number,
    placeholder: String,
  },
  setup() {
    const tags = ref(['js', 'PHP', 'SQL']);
    const tag = ref('');
    const addTag = () => {
      if (tags.value.length < 5) {
        tags.value.push(tag.value);
        tag.value = '';
      }
    };

    return { tag, tags, addTag };
  },
};
</script>
<style scoped>
.tag-input-wrapper {
  display: flex;
  margin: 10px 0px 10px 0px;
}

.tag-input-tag {
  padding: 1px 8px;
  font-size: 0;
  line-height: 1.5;
  text-align: center;
  white-space: nowrap;
  border: 1px solid #dfdfdf;
  border-radius: 4px;
  outline: 0;
  color: #3f536e;
  border-color: #dfdfdf;
  background-color: #fbfbfb;
  font-size: 12px;
  margin-right: 5px;
}

.tag-input-tag > span {
  font-size: 10px;
  padding-right: 4px;
  margin: 0;
  cursor: pointer;
}

.tag-input-text {
  border: none;
  outline: none;
  font-size: inherit;
  background: none;
}
</style>