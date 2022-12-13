<template>
  <div class="main-navigation-wrapper" v-show="show">
    <ul class="main-navigation">
      <li v-for="(menu, key) in items" :key="key" :class="{ active: selected == menu.value }">
        <label :for="menu.value">
          <input type="radio" name="menu" :id="menu.value" :value="menu.value" v-model="selected" />
          <span><u-icon :name="menu.icon" /> {{ menu.label }}</span>
        </label>
      </li>
    </ul>
  </div>
</template>
<script setup>
import { computed } from 'vue';

const props = defineProps({
  show: {
    type: Boolean,
    default: true,
  },
  modelValue: {
    type: String,
  },
  items: {
    type: Array,
    required: true,
  },
});
const emit = defineEmits(['update:modelValue']);
const selected = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});
</script>
<style scoped>
.main-navigation {
  list-style-type: none;
  line-height: 30px;
  padding: 0;
  margin: 0;
  padding: 5px;
}

span {
  width: 100%;
}

label {
  display: inline-flex;
  cursor: pointer;
  width: 100%;
  padding: 1px 3px 1px 3px;
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
