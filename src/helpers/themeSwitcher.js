const setupTheme = (theme) => {
  document.documentElement.setAttribute('data-theme', theme);
  document
    .querySelector('meta[name="theme-color"]')
    .setAttribute(
      'content',
      getComputedStyle(document.documentElement).getPropertyValue('--body-bg')
    );
};

export default setupTheme;
