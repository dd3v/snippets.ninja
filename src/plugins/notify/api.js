import { reactive, readonly } from 'vue';

const state = reactive({
  notifications: [],
});

const notifications = readonly(state.notifications);

const addNotification = (notification) => state.notifications.unshift(notification);
const deleteNotification = (index) => state.notifications.splice(index, 1);

const methods = {
  error: (message) => {
    addNotification({ message, type: 'error' });
  },
};

export { notifications, deleteNotification, methods };
