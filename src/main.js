import { createApp } from 'vue';
import UIcon from './components/base/UIcon.vue';
import App from './App.vue';
import './assets/css/app.css';

const app = createApp(App);
app.component('u-icon', UIcon);
app.mount('#app');
