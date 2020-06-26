const express = require('express');
const router = express.Router();
const {webPush} = require('../webpush');
let pushSubscription;

router.post('/subscription', async (req, res) => {
  try {
    pushSubscription = req.body;
    // const payload = JSON.stringify({
    //   tittle: 'My custom Notification',
    //   message: 'hello world'
    // });
    // res.status(500).json();
    // await webPush.sendNotification(pushSubscription, payload);
    return res.status(200).json({ok: true, message: 'primera ruta'});
  } catch (e) {
    console.log(e)
    return res.status(500).json({ok: true});
  }
})

router.post('/new-message', async (req, res) => {
  try {
    const {message} = req.body;
    const payload = JSON.stringify({
      tittle: 'new Notification',
      message: message
    });

    await webPush.sendNotification(pushSubscription, payload);
    // return res.status(200).json({ok: true});
  } catch (err) {
    console.log(err)
    return res.status(500).json({ok: false,})
  }
})
module.exports = router;
