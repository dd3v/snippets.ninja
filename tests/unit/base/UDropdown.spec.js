import { mount } from '@vue/test-utils';
import UDropdown from '@/components/base/UDropdown.vue';
import UIcon from '@/components/base/UIcon.vue';
import UButton from '@/components/base/UButton.vue';

describe('UDropdown.vue', () => {
  it('UDropdown render', async () => {
    const wrapper = mount(UDropdown, {
      global: {
        components: {
          'u-icon': UIcon,
          'u-button': UButton,
        },
      },
      props: {
        icon: 'cloud',
      },
    });

    await wrapper.find('button').trigger('click');
    expect(wrapper.vm.isOpen).toBe(true);
  });

  it('Close if outside click', async () => {
    const wrapper = mount(UDropdown, {
      global: {
        components: {
          'u-icon': UIcon,
          'u-button': UButton,
        },
      },
      props: {
        icon: 'cloud',
      },
    });

    await wrapper.find('button').trigger('click');
    document.dispatchEvent(new Event('click'));
    expect(wrapper.vm.isOpen).toBe(true);
  });
});
