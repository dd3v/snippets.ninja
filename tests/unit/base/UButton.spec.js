import { mount } from '@vue/test-utils';
import UButton from '@/components/base/UButton.vue';

describe('UButton.vue', () => {
  it('Default v-slot', () => {
    const wrapper = mount(UButton, {
      slots: {
        default: 'Button content',
      },
    });
    expect(wrapper.text()).toContain('Button content');
  });

  it('Optional Props', () => {
    const wrapper = mount(UButton, {
      slots: {
        default: 'Button content',
      },
      props: {
        circle: true,
      },
    });
    expect(wrapper.classes()).toContain('btn-circle');
  });
});
