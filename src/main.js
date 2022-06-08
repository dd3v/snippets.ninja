import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';
import { createApp } from 'vue';
import UIcon from '@/components/base/UIcon.vue';
import UButton from '@/components/base/UButton.vue';
import UInput from '@/components/base/UInput.vue';
import UModal from '@/components/base/UModal.vue';
import UTagInput from '@/components/base/UTagInput.vue';
import EntryPoint from '@/EntryPoint.vue';

import notify from '@/plugins/notify';
import '@/assets/css/app.css';
import './registerServiceWorker';

dayjs.extend(calendar);
dayjs().calendar(null, {
  sameDay: '[Today at] h:mm A',
  lastDay: '[Yesterday at] h:mm A',
  sameElse: 'DD/MM/YYYY',
});

const app = createApp(EntryPoint);
app.provide('dayjs', dayjs);
app.use(notify);
app.component('u-icon', UIcon);
app.component('u-button', UButton);
app.component('u-input', UInput);
app.component('u-modal', UModal);
app.component('u-tag-input', UTagInput);

app.mount('#app');
