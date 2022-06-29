<template>
  <u-modal ref="modal">
    <template #header>GitHub Gist integration</template>
    <template #body>
      <div class="github-sync" v-if="!connected">
        <ul class="github-features">
          <li><u-icon name="share" /> publish and share your snippers with GitHub</li>
          <li><u-icon name="cloud" /> use GitHub as a cloud storage</li>
          <li><u-icon name="download" /> import your gists to Snippets Ninja</li>
        </ul>
        <div class="github-button">
          <u-button @click="connect" variant="default">
            <u-icon name="github" /> Setup GitHub connection
          </u-button>
        </div>
      </div>
      <div v-else>
        <div class="github-info">
          <div class="profile">
            <img :src="profile.avatar_url" alt="avatar" width="50" />
            <ul>
              <li>Login: {{ profile.login }}</li>
              <li>E-mail: {{ profile.email }}</li>
            </ul>
          </div>
          <div class="gist">
            <ul>
              <li v-for="(gist, key) in gists" :key="key">
                {{ gist }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </template>
  </u-modal>
</template>
<script setup>
import { ref } from 'vue';
import { GitHubService, OctokitInstance } from '@/helpers/github';
import globalState from '@/globalState';

const connect = () => GitHubService.authorize(process.env.VUE_APP_GITHUB_CLIENT_ID);

const connected = globalState.getGitHubToken();
const gists = ref([]);
if (connect) {
  const octokit = new OctokitInstance({ auth: globalState.getGitHubToken() });
  gists.value = await octokit.paginate(octokit.rest.gists.list);
  console.warn(gists.value);
}
const profile = globalState.getProfile();

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
.profile {
  color: red;
  display: inline-flex;
}
</style>