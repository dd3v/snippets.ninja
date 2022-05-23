<template>
  <div class="snippet">
    <div class="title">
      <span><u-icon :icon="snippet.favorite ? 'heart' : 'heart-empty'" /> </span>
      <span style="flex:1;">{{ title }}</span>
      <span><u-icon icon="cloud" /></span>
    </div>
    <div class="info">
      <span class="snippet-language"><u-icon icon="code" /> {{ snippet.language }}</span>
      <span class="snippet-date">{{ datetime }}</span>
    </div>
  </div>
</template>
<script>
import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';

import { computed } from 'vue';
import UIcon from '../core/UIcon.vue';

export default {
  components: { UIcon },
  props: {
    snippet: {
      type: Object,
    },
  },
  setup(props) {
    dayjs.extend(calendar);
    dayjs().calendar(null, {
      sameDay: '[Today at] h:mm A',
      lastDay: '[Yesterday at] h:mm A',
      sameElse: 'DD/MM/YYYY',
    });
    const datetime = computed(() => dayjs(props.snippet.updated_at).calendar());
    const title = computed(() =>
      props.snippet.title.length >= 25 ? `${props.snippet.title.slice(0, 25)}...` : props.snippet.title
    );
    return { title, datetime };
  },
};
</script>
<style scoped>
.snippet {
  cursor: pointer;
  color: inherit;
  margin: 5px 0px 5px 0px;
  padding: 1px 5px 1px 5px;
}

.snippet .title {
  display: flex;
  justify-content: space-between;
}

.snippet .info {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #686669;
}
</style>
