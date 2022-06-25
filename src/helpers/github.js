const getAccessToken = async (code, proxyUrl) => {
  const response = await fetch(proxyUrl, {
    method: 'POST',
    cache: 'no-cache',
    body: JSON.stringify({ code }),
  });
  if (!response.ok) {
    const err = new Error(`HTTP status code: ${response.status}`);
    err.response = response;
    err.status = response.status;
    throw err;
  }
  return response;
};

const authorize = (clientId, scope = 'read:user, gist') => {
  const baseUrl = 'https://github.com/login/oauth/authorize';
  const authUrl = `${baseUrl}?client_id=${clientId}&scope=${scope}&allow_signup=false`;
  window.location.href = authUrl;
};

const profile = () => localStorage.getItem('github');

export { getAccessToken, authorize, profile };
