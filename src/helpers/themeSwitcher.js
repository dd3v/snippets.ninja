const updateDOM = (theme) => {
  document.documentElement.setAttribute('data-theme', theme);
  document
    .querySelector('meta[name="theme-color"]')
    .setAttribute(
      'content',
      getComputedStyle(document.documentElement).getPropertyValue('--body-bg')
    );
  localStorage.setItem('theme', theme);
};

const toggleTheme = (current = 'light') => {
  const theme = current === 'light' ? 'dark' : 'light';
  updateDOM(theme);
  return theme;
};

const installTheme = (byDefault = 'light') => {
  const theme = localStorage.getItem('theme') ?? byDefault;
  updateDOM(theme);
  return theme;
};

export { toggleTheme, installTheme };
