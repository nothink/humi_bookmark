export const upload = (vcards: string[]): void => {
  if (vcards.length > 0) {
    // remove dups
    const nodups = [...new Set(vcards)]
    const urls = nodups.map(
      (vcard) => `https://dqx9mbrpz1jhx.cloudfront.net/${vcard}`
    )

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
}
