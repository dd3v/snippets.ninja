<template>
  <div class="main-navigation-wrapper">
    <ul class="main-navigation">
      <li v-for="(menu, key) in items" :key="key" :class="selected == menu.value ? 'active' : ''">
        <label :for="menu.value">
          <input type="radio" name="menu" :id="menu.value" :value="menu.value" v-model="selected" />
          <span><u-icon :icon="menu.icon" /> {{ menu.label }}</span>
        </label>
      </li>
    </ul>
  </div>
</template>
<script>
import { computed } from '@vue/reactivity';

export default {
  name: 'MainNavigation',
  props: {
    modelValue: {
      type: String,
    },
    items: {
      type: Array,
    },
  },
  setup(props, { emit }) {
    const selected = computed({
      get: () => props.modelValue,
      set: (value) => emit('update:modelValue', value),
    });

    return { selected };
  },
};
</script>
<style scoped>
.main-navigation-wrapper {
  padding: 5px;
}
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
