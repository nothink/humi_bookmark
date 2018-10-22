AWS.config.update({
    accessKeyId: '7RHAZOIGLCETV4Y83HMF',
    secretAccessKey: 'B6oPITfLzrmKFGiNZyyCa2eo5L2V2ee1JlSsZFEF',
    region: 'us-east-1'
});
var ep = new AWS.Endpoint('s3.wasabisys.com');
var s3 = new AWS.S3({
    endpoint: ep,
    params: {Bucket: 'humi-bookmark'}
});

// remove array's duplicates
function removeArrayDuplicates(array) {
  return array.filter(function(value, index, self) {
    return self.indexOf(value) === index;
  });
}

function upload (array) {
    if (array.length > 0) {
        var uploads = removeArrayDuplicates(array).sort();
        var params = {
            Key: Date.now().toString() + '.log',
            ContentType: 'text/plain',
            Body: uploads.join("\n") + '\n'
        };
        s3.putObject(params, function (err, data) {
          if (err) {
              console.error(err);
              return [];
          } else {
              console.log(params.Body);
              console.log(data);
              return uploads;
          }
        });
    }
}
