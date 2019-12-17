// UA -> iOS Safari
chrome.webRequest.onBeforeSendHeaders.addListener(
    function(info) {
        let headers = info.requestHeaders;
        headers.forEach(function(header, i) {
            if(header.name.toLowerCase() == 'user-agent'){
                header.value = "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1";
            }
        });
        return {requestHeaders: headers};
    },
    {
        urls: [
            '*://vcard.ameba.jp/*',
            '*://*.cloudfront.net/vcard/*',
        ],
        types: [
            "csp_report",
            "font",
            "image",
            "main_frame",
            "media",
            "object",
            "other",
            "ping",
            "script",
            "stylesheet",
            "sub_frame",
            "websocket",
            "xmlhttprequest"
        ]
    },
    [
        "blocking",
        "requestHeaders"
    ]
);
