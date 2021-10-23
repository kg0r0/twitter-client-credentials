const express = require('express');
const app = express();
const { Issuer } = require('openid-client');
const config = require('./config.json');
const issuer = new Issuer({
  token_endpoint: 'https://api.twitter.com/oauth2/token'
});
const client = new issuer.Client({
  client_id: config.client_id,
  client_secret: config.client_secret,
  token_endpoint: 'https://api.twitter.com/oauth2/token'
})

app.get('/', (req, res, next) => {
  (async () => {
    const tokenSet = await client.grant({
      grant_type: 'client_credentials'
    })
    console.log('received and validated tokens %j', tokenSet);
    return res.send('OK');
  })().catch(next);
});

const port = config.port || 3000;
app.listen(port, () => {
  console.log(`Started app on port ${port}`);
});