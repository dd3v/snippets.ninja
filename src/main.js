import { createApp } from 'vue';
import UIcon from './components/ui/UIcon.vue';
import App from './App.vue';
import './css/app.css';
import './css/fonts.css';
import './css/icons.css';

const app = createApp(App);
app.component('u-icon', UIcon);
app.mount('#app');
