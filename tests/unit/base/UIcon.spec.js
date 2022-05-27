import { mount } from '@vue/test-utils';
import UIcon from '@/components/base/UIcon.vue';

describe('UIcon.vue', () => {
  it('Default', () => {
    const wrapper = mount(UIcon, {
      props: {
        name: 'heart',
        color: 'rgb(0, 0, 0)',
        fontSize: '16px',
      },
    });

    expect(wrapper.classes()).toContain('icon-heart');
  });

  it('Optional Props', () => {
    const wrapper = mount(UIcon, {
      props: {
        name: 'cloud',
        color: 'rgb(0, 0, 0)',
        fontSize: '16px',
      },
    });
    expect(wrapper.isVisible()).toBe(true);
    expect(wrapper.classes()).toContain('icon-cloud');
    expect(wrapper.attributes()).toHaveProperty('style', 'color: rgb(0, 0, 0); font-size: 16px;');
  });
});
