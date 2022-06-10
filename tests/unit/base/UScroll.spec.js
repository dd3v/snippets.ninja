import { mount } from '@vue/test-utils';

import UScroll from '@/components/base/UScroll.vue';

describe('UScroll.vue', () => {
  it('Slot', () => {
    const wrapper = mount(UScroll, {
      propsData: {
        limit: 100,
      },
      slots: {
        default: 'paginate data',
      },
    });

    expect(wrapper.html()).toContain('paginate data');
  });
});
