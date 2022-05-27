<template>
  <div class="main-navigation-wrapper" v-show="show">
    <ul class="main-navigation">
      <li v-for="(menu, key) in items" :key="key" :class="selected == menu.value ? 'active' : ''">
        <label :for="menu.value">
          <input type="radio" name="menu" :id="menu.value" :value="menu.value" v-model="selected" />
          <span><u-icon :name="menu.icon" /> {{ menu.label }}</span>
        </label>
      </li>
    </ul>
  </div>
</template>
<script>
import modelWrapper from '@/composable/modelWrapper';

export default {
  name: 'MainNavigation',
  props: {
    show: {
      type: Boolean,
      default: true,
    },
    modelValue: {
      type: String,
    },
    items: {
      type: Array,
    },
  },
  setup(props, { emit }) {
    const selected = modelWrapper(props, emit);

    return { selected };
  },
};
</script>
<style scoped>
span {
  width: 100%;
}

label {
  display: inline-flex;
  cursor: pointer;
  width: 100%;
}

label [type='radio'] {
  display: none;
  cursor: pointer;
}

li.active {
  border-radius: 5px;
  background: var(--primary-bg-color);
  color: var(--primary-text-color);
}
</style>
