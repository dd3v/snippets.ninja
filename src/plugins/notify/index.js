import UNotify from './UNotify.vue';

import { methods } from './api';

export default {
  install: (app) => {
    app.component('u-notify', UNotify);
    app.provide('notify', methods);
  },
};
