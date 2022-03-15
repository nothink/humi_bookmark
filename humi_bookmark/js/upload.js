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

        fetch('https://api.seio.club/api/resource-queues/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(uploads),
        }).catch(console.error);

    }
}
