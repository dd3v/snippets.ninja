exports.handler = async () => ({
  statusCode: 200,
  body: JSON.stringify({}),
  headers: {
    'Access-Control-Allow-Origin': 'http://localhost:8080',
    'Content-Type': 'application/json',
  },
});
