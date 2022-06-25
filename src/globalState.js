import { reactive, readonly } from 'vue';

const state = reactive({ theme: 'light', github: {}, githubAccessToken: '' });

const globalState = {
  data: readonly(state),
  setTheme: (theme) => {
    state.theme = theme;
    localStorage.setItem('theme', theme);
  },
  getTheme: () => {
    state.theme = localStorage.getItem('theme') ?? 'light';
    return state.theme;
  },
  toggleTheme: () => {
    const theme = globalState.getTheme() === 'light' ? 'dark' : 'light';
    globalState.setTheme(theme);
    return theme;
  },
  getThemeIcon: () => {
    switch (state.theme) {
      case 'light':
        return 'moon-inv';
      case 'dark':
        return 'sun-inv';
      default:
        return 'sun-inv';
    }
  },
};

export default globalState;
