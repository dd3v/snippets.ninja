import { createApp } from 'vue';
import UiIcon from './components/ui/UiIcon.vue';
import App from './App.vue';
import './css/app.css';

const app = createApp(App);
app.component('ui-icon', UiIcon);
app.mount('#app');
