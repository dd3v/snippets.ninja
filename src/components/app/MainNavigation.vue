<template>
  <ul class="main-navigation">
    <li v-for="(menu, key) in items" :key="key" :class="selected == menu.value ? 'active' : ''">
      <label :for="menu.value">
        <input type="radio" name="menu" :id="menu.value" :value="menu.value" v-model="selected" />
        <span><u-icon :icon="menu.icon" /> {{ menu.label }}</span>
      </label>
    </li>
  </ul>
</template>
<script>
import { ref } from '@vue/reactivity';
import { watch } from '@vue/runtime-core';

export default {
  name: 'MainNavigation',
  props: {
    items: Object,
    default: String,
  },
  setup(props, context) {
    const selected = ref(props.default);
    watch(selected, () => context.emit('update', selected.value));

    return { selected };
  },
};
</script>
<style scoped>
ul.main-navigation li label {
  cursor: pointer;
}

.main-navigation label [type='radio'] {
  display: none;
  cursor: pointer;
}

ul.main-navigation li.active {
  border-radius: 5px;
  background: hsl(264deg 10% 14% / 12%);
  color: #2b292e;
}
</style>
