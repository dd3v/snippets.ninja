const https = require('https');
const { URL } = require('url');

function extractCode(event) {
  const data = JSON.parse(event.body);
  return data?.code;
}

const cors = ['http://localhost:8080', 'https://snippets.ninja'];

const generateResponse = (event, data, status = 200) => {
  const response = {
    statusCode: status,
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (cors.indexOf(event.headers.origin) !== -1) {
    response.headers['Access-Control-Allow-Origin'] = event.headers.origin;
  }

  return response;
};

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
    return generateResponse(event, { message: 'Auth code not found.' }, 422);
  }
  try {
    response = await exchangeCodeForToken(code);
  } catch (e) {
    return generateResponse(event, { message: `GitHub error. ${e}` }, 400);
  }
  if (!response || !response.access_token) {
    return generateResponse(
      event,
      { message: 'GitHub auth code error. Please, try again later.' },
      400
    );
  }

  return generateResponse(event, { access_token: response.access_token }, 200);
};
