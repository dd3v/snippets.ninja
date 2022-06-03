const setupTheme = (theme = 'light') => {
  document.documentElement.setAttribute('data-theme', theme);
  document
    .querySelector('meta[name="theme-color"]')
    .setAttribute(
      'content',
      getComputedStyle(document.documentElement).getPropertyValue('--body-bg')
    );
  localStorage.setItem('theme', theme);

  return theme;
};

export default setupTheme;
