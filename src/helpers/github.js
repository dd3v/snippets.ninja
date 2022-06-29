import { Octokit } from 'octokit';
import { paginateRest } from '@octokit/plugin-paginate-rest';

const OctokitInstance = Octokit.plugin(paginateRest);

const GitHubService = {
  getAccessToken: async (code, url) => {
    const response = await fetch(url, {
      method: 'POST',
      cache: 'no-cache',
      body: JSON.stringify({ code }),
    });
    const data = await response.json();
    if (!response.ok) {
      const err = new Error(`HTTP ${response.status}. ${data.message}`);
      err.response = response;
      err.status = response.status;
      throw err;
    }
    return data;
  },

  authorize: (clientId, scope = 'read:user, gist') => {
    const baseUrl = 'https://github.com/login/oauth/authorize';
    const authUrl = `${baseUrl}?client_id=${clientId}&scope=${scope}&allow_signup=false`;
    window.location.href = authUrl;
  },
};

export { GitHubService, OctokitInstance };
