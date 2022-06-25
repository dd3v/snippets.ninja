const https = require('https');
const { URL } = require('url');

function extractCode(event) {
  const data = JSON.parse(event.body);
  return data?.code;
}

const generateResponse = (data, status = 200) => ({
  statusCode: status,
  body: JSON.stringify(data),
  headers: {
    'Access-Control-Allow-Origin': 'http://localhost:8080',
    'Content-Type': 'application/json',
  },
});

async function asyncHttpsPostRequest(url) {
  return new Promise((resolve, reject) => {
    https
      .request(
        {
          method: 'POST',
          host: url.host,
          path: url.pathname + url.search,
          headers: {
            Accept: 'application/json',
          },
        },
        (resp) => {
          let data = '';
          resp.on('data', (chunk) => {
            data += chunk;
          });
          resp.on('end', () => {
            try {
              const parsed = JSON.parse(data);
              resolve(parsed);
            } catch (e) {
              reject(data);
            }
          });
        }
      )
      .on('error', reject)
      .end();
  });
}

async function exchangeCodeForToken(code) {
  const api = new URL('/login/oauth/access_token', 'https://github.com');
  api.searchParams.set('client_id', process.env.GITHUB_CLIENT_ID);
  api.searchParams.set('client_secret', process.env.GITHUB_CLIENT_SECRET);
  api.searchParams.set('code', code);

  return asyncHttpsPostRequest(api);
}

exports.handler = async (event) => {
  const code = extractCode(event);
  let response;
  if (!code) {
    return generateResponse({ message: 'Did not get auth code' }, 400);
  }
  try {
    response = await exchangeCodeForToken(code);
  } catch (e) {
    return generateResponse({ message: 'Failed to exchange code for access_token' }, 400);
  }
  if (!response || !response.access_token) {
    return generateResponse({ message: 'GitHub error' }, 400);
  }
  
  return generateResponse({ access_token: response.access_token }, 200);
};
