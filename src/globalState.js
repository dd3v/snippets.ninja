import { reactive, readonly } from 'vue';

const state = reactive({
  theme: 'light',
  profile: {},
  token: '',
});

const globalState = {
  data: readonly(state),
  setGitHubToken: (token) => {
    state.token = token;
    localStorage.setItem('token', token);
  },
  getGitHubToken: () => localStorage.getItem('token'),
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
