const webPush = require('web-push');

webPush.setVapidDetails(
  'mailto:thaymerapv@gmail.com',
  process.env.PUBLIC_WAPID_KEY,
  process.env.PRIVATE_WAPID_KEY
);

module.exports = {webPush};
