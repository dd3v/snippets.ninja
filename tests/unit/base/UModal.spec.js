import { mount } from '@vue/test-utils';
import UModal from '@/components/base/UModal.vue';

describe('UModal.vue', () => {
  it('Modal props and slot', () => {
    const wrapper = mount(UModal, {
      global: {
        stubs: {
          teleport: true,
        },
      },
      slots: {
        header: 'Modal header',
        body: 'Modal content',
      },
    });
    expect(wrapper.find('.modal-title').text()).toEqual('Modal header');
    expect(wrapper.find('.modal-body').text()).toContain('Modal content');
  });

  it('Open modal', () => {
    const wrapper = mount(UModal, {
      global: {
        stubs: {
          teleport: true,
        },
      },
      slots: {
        header: 'Modal header',
        body: 'Modal content',
      },
    });
    wrapper.vm.open();
    expect(wrapper.vm.show).toBe(true);
  });

  it('Close modal', () => {
    const wrapper = mount(UModal, {
      global: {
        stubs: {
          teleport: true,
        },
      },
      slots: {
        header: 'Modal header',
        body: 'Modal content',
      },
    });
    wrapper.vm.open();
    wrapper.find('button.close-btn').trigger('click');
    expect(wrapper.vm.show).toBe(false);
  });

  it('Backdrop close', () => {
    const wrapper = mount(UModal, {
      global: {
        stubs: {
          teleport: true,
        },
      },
      slots: {
        header: 'Modal header',
        body: 'Modal content',
      },
    });
    wrapper.vm.open();
    wrapper.find('.modal-backdrop').trigger('click');
    expect(wrapper.vm.show).toBe(false);
  });

  it('ESC close', () => {
    const wrapper = mount(UModal, {
      global: {
        stubs: {
          teleport: true,
        },
      },
      slots: {
        header: 'Modal header',
        body: 'Modal content',
      },
    });
    wrapper.vm.open();
    wrapper.find('.modal-backdrop').trigger('click');
    expect(wrapper.vm.show).toBe(false);
  });
});
