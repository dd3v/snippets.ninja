<template>
  <ul class="tag-navigation">

    <li v-for="(tag, key) in items" :key="key">
      <label :for="tag">
        <span>
          <input
            type="checkbox"
            name="tag"
            :id="tag"
            v-model="selected"
            :value="tag"
          />
          # {{ tag }}
        </span>
      </label>
    </li>
  </ul>
</template>
<script>
import { ref } from '@vue/reactivity';
import { watch } from '@vue/runtime-core';

export default {
  name: 'TagNavigation',
  props: {
    items: Array,
  },
  setup(_, context) {
    const selected = ref([]);
    watch(selected, () => {
      context.emit('update', selected.value);
    });

    return { selected };
  },
};
</script>
<style scoped>
ul.tag-navigation li {
  padding: 5px 0px 5px 0px;
}
.tag-navigation label {
  cursor: pointer;
}
.tag-navigation label [type='checkbox'] {
  display: none;
}

 input[type='checkbox']:checked + span {
  color: red;
}

</style>
