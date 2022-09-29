// remove array's duplicates
function removeArrayDuplicates(array) {
    return array.filter(function(value, index, self) {
        return self.indexOf(value) === index;
    });
}

// remove double slash path to single slash
function removeDoubleSlash(string) {
    return 'https://' + string.replace('//', '/');
    // return string.replace('//', '/');
}

// upload URL arrays to wasabi storage (type: text/plain)
function upload(array) {
    if (array.length > 0) {
        // remove dups
        let uploads = removeArrayDuplicates(array).sort();
        uploads = uploads.map(removeDoubleSlash);

        // put array to api.

        // let endpoint = 'https://api.seio.club/api/resource-queues/';
        let endpoint = 'https://momoichigo-2jwvi5kfma-an.a.run.app/api/resource-queues/';
        fetch(endpoint, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(uploads),
        }).catch(console.error);
        let endpoint2 = 'https://asia-northeast1-seioclub.cloudfunctions.net/dqx9mbrpz1jhx';
        let uploads2 = {"urls": uploads};
        fetch(endpoint2, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(uploads2),
        }).catch(console.error);
    }
}
