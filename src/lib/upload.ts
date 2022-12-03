// remove array's duplicates
function removeArrayDuplicates(array: string[]): string[] {
  return array.filter(function (value, index, self) {
    return self.indexOf(value) === index
  })
}

// remove double slash path to single slash
function removeDoubleSlash(string: string): string {
  return 'https://' + string.replace('//', '/')
  // return string.replace('//', '/');
}

export const upload = (array: string[]): void => {
  if (array.length > 0) {
    // remove dups
    let uploads = removeArrayDuplicates(array).sort()
    uploads = uploads.map(removeDoubleSlash)

    // put array to api.
    const endpoint2 =
      'https://asia-northeast1-seioclub.cloudfunctions.net/dqx9mbrpz1jhx'
    const uploads2 = { urls: uploads }
    fetch(endpoint2, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(uploads2),
    }).catch(console.error)
  }
}
