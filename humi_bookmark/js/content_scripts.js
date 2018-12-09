function onSiteLoad() {
    const regex = /(c.|)stat100.ameba.jp\/vcard\/[-a-zA-Z0-9/._+]*\.(?!build)[a-zA-Z0-9]+/gm;
    let html = DOMtoString(document);
    if (html) {
        // replace all '\/' to '/'
        html = html.replace(/\\\//g, '/');
        let files = [];
        let m;
        while ((m = regex.exec(html)) !== null) {
            // This is necessary to avoid infinite loops with zero-width matches
            if (m.index === regex.lastIndex) {
                regex.lastIndex++;
            }

            // The result can be accessed through the `m`-variable.
            // replace all '//' to '/'
            let key = m[0].replace(/\/\//g, '/')
            files.push(key);
        }
        if (files.length > 0) {
            upload(files);
        }
    }
}

onSiteLoad();
