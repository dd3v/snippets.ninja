import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';
import { createApp } from 'vue';
import UIcon from '@/components/base/UIcon.vue';
import UButton from '@/components/base/UButton.vue';
import UDropdown from '@/components/base/UDropdown.vue';
import UInput from '@/components/base/UInput.vue';
import UModal from '@/components/base/UModal.vue';
import UTagInput from '@/components/base/UTagInput.vue';

import App from '@/App.vue';
import '@/assets/css/app.css';
import './registerServiceWorker';

dayjs.extend(calendar);
dayjs().calendar(null, {
  sameDay: '[Today at] h:mm A',
  lastDay: '[Yesterday at] h:mm A',
  sameElse: 'DD/MM/YYYY',
});

const app = createApp(App);
app.provide('dayjs', dayjs);
app.component('u-icon', UIcon);
app.component('u-button', UButton);
app.component('u-dropdown', UDropdown);
app.component('u-input', UInput);
app.component('u-modal', UModal);
app.component('u-tag-input', UTagInput);

app.mount('#app');
