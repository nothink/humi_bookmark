// UA -> iOS Safari
chrome.webRequest.onBeforeSendHeaders.addListener(
    function(info) {
        let headers = info.requestHeaders;
        headers.forEach(function(header, i) {
            if(header.name.toLowerCase() == 'user-agent'){
                header.value = "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1";
                // // https://sites.google.com/site/kairera0467/index/gfkari/trash
                // // 基本的にUAしか見ていない？
                // // バージョン違いはアップデートアラートが出る
                // // 現在の最新版UAは不明なので要確認
                // header.value = "Mozilla/5.0 (Linux; Android 10; Pixel 3) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/37.0.0.0 Mobile Safari/537.36 CaWebApp/1.0(jp.ameba.vcard;4.10.0;ja;)";
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
