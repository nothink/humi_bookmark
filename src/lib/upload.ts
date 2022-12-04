export const upload = (urls: string[]): void => {
  // put array to api.
  const endpoint =
    'https://asia-northeast1-seioclub.cloudfunctions.net/dqx9mbrpz1jhx'
  fetch(endpoint, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ urls }),
  }).catch(console.error)
}
