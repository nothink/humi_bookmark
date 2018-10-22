function onSiteLoad() {
    const regex = /(c.|)stat100.ameba.jp\/vcard\/[-a-zA-Z0-9/._+]*.[a-zA-Z0-9]+/gm;
    let html = DOMtoString(document);
    if (html) {
        let files = [];
        let m;
        while ((m = regex.exec(html)) !== null) {
            // This is necessary to avoid infinite loops with zero-width matches
            if (m.index === regex.lastIndex) {
                regex.lastIndex++;
            }

            // The result can be accessed through the `m`-variable.
            files.push(m[0]);
        }
        if (files.length > 0) {
            upload(files);
        }
    }
}

onSiteLoad();
