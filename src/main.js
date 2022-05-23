import { createApp } from 'vue';
import UIcon from './components/core/UIcon.vue';
import App from './App.vue';
import './assets/css/app.css';
import './assets/css/fonts.css';
import './assets/css/icons.css';


const app = createApp(App);
app.component('u-icon', UIcon);
app.mount('#app');
