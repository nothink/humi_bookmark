// remove Ameba footers on iOS Safari
function removeAgps() {
  try {
    let agpFooter = document.getElementById('AGP_footer')
    agpFooter.parentNode.removeChild(agpFooter)
  } catch (e) {}
  try {
    let globalFooter = document.getElementById('amebaGlobalFooter')
    globalFooter.parentNode.removeChild(amebaGlobalFooter)
  } catch (e) {}
}

// upload pushed files
function uploadResources() {
  const regex =
    /((c.|)stat100.ameba.jp)|([a-z0-9]*\.cloudfront\.net)\/vcard\/[-a-zA-Z0-9/._+]*\.(?!build)[a-zA-Z0-9]+/gm
  let html = DOMtoString(document)
  if (html) {
    // replace all '\/' to '/'
    html = html.replace(/\\\//g, '/')
    let files = []
    let m
    while ((m = regex.exec(html)) !== null) {
      // This is necessary to avoid infinite loops with zero-width matches
      if (m.index === regex.lastIndex) {
        regex.lastIndex++
      }

      // The result can be accessed through the `m`-variable.
      // replace all '//' to '/'
      let key = m[0].replace(/\/\//g, '/')
      files.push(key)
    }
    if (files.length > 0) {
      upload(files)
    }
  }
}

function showDialogBox() {
  const div = document.createElement('div')
  div.id = 'hoge'
  div.style.position = 'fixed'
  div.style.top = '2px'
  div.style.left = '1px'
  div.style.width = '7px'
  div.style.height = '16px'
  div.style.backgroundColor = 'green'
  document.body.appendChild(div)
}

// entry point func.
function onSiteLoad() {
  removeAgps()
  uploadResources()

  showDialogBox()
}

onSiteLoad()
