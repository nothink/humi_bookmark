AWS.config.update({
    accessKeyId: wasabi.accessKeyId,
    secretAccessKey: wasabi.secretAccessKey,
    region: wasabi.region
});

// remove array's duplicates
function removeArrayDuplicates(array) {
    return array.filter(function(value, index, self) {
        return self.indexOf(value) === index;
    });
}

// remove double slash path to single slash
function removeDoubleSlash(string) {
    return string.replace('//', '/');
}

// upload URL arrays to wasabi storage (type: text/plain)
function upload(array) {
    if (array.length > 0) {
        let sts = new AWS.STS( {endpoint: wasabi.stsEndpoint });
        sts.assumeRole({
            RoleArn: wasabi.stsRoleArn,
            RoleSessionName: 'humi_bookmark',
            DurationSeconds: 1200
        }, (err, data) => {
            if (err) {
                console.error('Cannot assume role');
                console.error(err, err.stack);
            } else {
                // remove dups
                let uploads = removeArrayDuplicates(array).sort();
                uploads = uploads.map(removeDoubleSlash);

                // set access keys and region
                AWS.config.update({
                    accessKeyId: data.Credentials.AccessKeyId,
                    secretAccessKey: data.Credentials.SecretAccessKey,
                    sessionToken: data.Credentials.SessionToken,
                    region: wasabi.region
                });

                let s3 = new AWS.S3({
                    endpoint: new AWS.Endpoint(wasabi.endpoint),
                    params: { Bucket: 'humi-bookmark' }
                });

                s3.putObject({
                    Key: Date.now().toString() + '.log',
                    ContentType: 'text/plain',
                    Body: uploads.join("\n") + '\n'
                }, (err, data) => {
                    if (err) {
                        console.error('Failed to put objects');
                        console.error(err, err.stack);
                        return [];
                    } else {
                        return uploads;
                    }
                });

                fetch('https://yurararan.nothink.jp/api/v0/resources', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        'urls': uploads,
                    }),
                }).catch(console.error);
            }
        });
    }
}
