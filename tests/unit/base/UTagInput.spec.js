import { mount } from '@vue/test-utils';
import UTagInput from '@/components/base/UTagInput.vue';

describe('UTagInput.vue', () => {
  it('Input tag', () => {
    const wrapper = mount(UTagInput, {
      props: {
        modelValue: [],
        max: 5,
        placeholder: 'Tag input',
      },
    });

    const input = wrapper.find('input');
    expect(input.element.placeholder).toEqual('Tag input');
    input.setValue('New tag');
    expect(input.element.value).toEqual('New tag');
  });

  it('Tag list', () => {
    const tags = ['Go', 'PHP', 'JS', 'HTML', 'CSS'];
    const wrapper = mount(UTagInput, {
      props: {
        modelValue: tags,
        max: 5,
        placeholder: 'Tag input',
      },
    });
    expect(tags).toEqual(wrapper.findAll('span.tag').map((item) => item.text()));
  });

  it('Add new hotkeys', async () => {
    const tags = ['Go', 'PHP', 'JS', 'HTML', 'CSS'];
    const wrapper = mount(UTagInput, {
      props: {
        modelValue: tags,
        max: 10,
        placeholder: 'Tag input',
      },
    });
    const input = wrapper.find('input');
    input.setValue('enter');
    await input.trigger('keydown.enter');
    expect(wrapper.findAll('span.tag').map((item) => item.text())).toContain('enter');
    input.setValue('comma');
    await input.trigger('keydown.,');
    expect(wrapper.findAll('span.tag').map((item) => item.text())).toContain('comma');
    input.setValue('tab');
    await input.trigger('keydown.tab');
    expect(wrapper.findAll('span.tag').map((item) => item.text())).toContain('tab');
  });

  it('Check tags limit', async () => {
    const tags = ['Go', 'PHP', 'JS', 'HTML', 'CSS'];
    const max = 5;
    const wrapper = mount(UTagInput, {
      props: {
        modelValue: tags,
        max,
        placeholder: 'Tag input',
      },
    });

    const input = wrapper.find('input');
    input.setValue('new tag');
    await input.trigger('keydown.enter');
    expect(wrapper.findAll('span.tag').length).toBe(5);
  });

  it('Delete tag hotkey', async () => {
    const tag = 'CSS';
    const tags = ['Go', 'PHP', 'JS', 'HTML', 'CSS'];
    const wrapper = mount(UTagInput, {
      props: {
        modelValue: tags,
        max: 5,
        placeholder: 'Tag input',
      },
    });
    const input = wrapper.find('input');
    await input.trigger('keydown.delete');
    expect(tags).not.toContain(tag);
  });

  it('Delete tag button', async () => {
    const toRemove = 'JS';
    const tags = ['Go', 'PHP', 'JS', 'HTML', 'CSS'];
    const wrapper = mount(UTagInput, {
      props: {
        modelValue: tags,
        max: 5,
        placeholder: 'Tag input',
      },
    });
    const button = wrapper.find(`[data-tag="${toRemove}"]`);
    await button.trigger('click');
    expect(tags).not.toContain(toRemove);
  });

  it('Ignore duplicates', async () => {
    const tags = ['Go', 'PHP', 'JS', 'HTML', 'CSS'];
    const duplicate = 'JS';
    const wrapper = mount(UTagInput, {
      props: {
        modelValue: tags,
        max: 10,
        placeholder: 'Tag input',
      },
    });
    const input = wrapper.find('input');
    input.setValue(duplicate);
    await input.trigger('keydown.enter');
    expect(tags.filter((item) => item === duplicate).length).toBe(1);
  });
});
