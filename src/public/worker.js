console.log('service worker')

self.addEventListener('push', async e => {
  console.log(e)
  const data = e.data.json();
  console.log(data)
  await self.registration.showNotification(data.tittle, {body: data.message})
})
