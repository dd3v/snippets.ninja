import { shallowMount } from '@vue/test-utils';
import UButton from '@/components/base/UButton.vue';

describe('UButton.vue', () => {
  it('test', () => {
    const wrapper = shallowMount(UButton, {});
    console.log(wrapper);
  });
});
