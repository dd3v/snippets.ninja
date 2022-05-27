import { mount } from '@vue/test-utils';
import UInput from '@/components/base/UInput.vue';

describe('UInput.vue', () => {
  it('Default input', () => {
    const wrapper = mount(UInput, {
      props: {
        name: 'text-input',
      },
    });
    expect(wrapper.element.name).toEqual('text-input');
  });

  it('Optional props', async () => {
    const wrapper = mount(UInput, {
      props: {
        name: 'text-input',
        modelValue: 'Hello world',
        type: 'text',
        variant: 'invisible',
        placeholder: 'Search term',
      },
    });
    expect(wrapper.element.name).toEqual('text-input');
    expect(wrapper.element.type).toEqual('text');
    expect(wrapper.element.placeholder).toEqual('Search term');
    expect(wrapper.element.classList).toContain('invisible-input');
    expect(wrapper.element.value).toEqual('Hello world');
  });
});
