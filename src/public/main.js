const PUBLIC_WAPID_KEY = 'BLVNZlgQCwFx28u7w7aNvympwmIoxlJD0kWgvsMXyrd7mgIMn94yBRZ_uTFdwr0d9q_LfRJYGjy9HXDbsHjfFrs'

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

const subscription = async () => {
  //service worker
  const register = await navigator.serviceWorker.register('./worker.js', {
    scope: '/'
  })

  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(PUBLIC_WAPID_KEY)
  })
  await fetch('/subscription', {
    method: 'POST',
    body: JSON.stringify(subscription),
    headers: {
      'Content-type': 'application/json'
    }
  });
  console.log('subscrito')
}

const form = document.querySelector('#myform');
const message = document.querySelector('#message');

form.addEventListener('submit', async e => {
  e.preventDefault();
  await fetch('/new-message', {
    method: 'POST',
    body: JSON.stringify({
      message: message.value
    }),
    headers: {
      'Content-type': 'application/json'
    }
  })
  form.reset();
})
subscription();
