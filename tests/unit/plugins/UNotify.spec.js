import { mount } from '@vue/test-utils';
import { methods, notifications } from '@/plugins/notify/api';
import UNotify from '@/plugins/notify/UNotify.vue';

describe('UNotify.vue', () => {
  const wrapper = mount(UNotify, {
    global: {
      stubs: {
        teleport: true,
      },
    },
  });
  methods.error('Some error');
  it('Display notification', () => {
    expect(notifications.length).toEqual(1);
    expect(wrapper.html()).toContain('Some error');
  });

  it('Close notification', async () => {
    const button = wrapper.find('button');
    await button.trigger('click');
    expect(notifications.length).toBe(0);
  });
});
