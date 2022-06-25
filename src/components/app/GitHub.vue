<template>
  <u-modal ref="modal">
    <template #header>GitHub Gist integration</template>
    <template #body>
      <div class="github-sync">
        <ul class="github-features">
          <li><u-icon name="share" /> publish and share your snippers with GitHub</li>
          <li><u-icon name="cloud" /> use GitHub as a cloud storage</li>
          <li><u-icon name="download" /> import your gists to Snippets Ninja</li>
        </ul>
        <div class="github-button">
          <u-button @click="github" variant="default">
            <u-icon name="github" /> Setup GitHub connection
          </u-button>
        </div>
      </div>
    </template>
  </u-modal>
</template>
<script setup>
import { ref } from 'vue';
import { authorize } from '@/helpers/github';

const github = () => authorize(process.env.VUE_APP_GITHUB_CLIENT_ID);

const modal = ref(null);

defineExpose({ modal });
</script>
<style scoped>
.github-features {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  margin: 0;
  gap: 10px;
}
.github-button {
  display: flex;
  justify-content: center;
  margin: 30px;
}
</style>