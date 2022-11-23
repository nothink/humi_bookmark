// global storage for dumping target paths.
var files = []

// set interval
let intervalId = setInterval(() => {
  let targets = files.concat()
  files = []
  if (targets.length > 0) {
    upload(targets)
  }
}, 5 * 1000)
