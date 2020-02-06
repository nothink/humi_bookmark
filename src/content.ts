// https://dqx9mbrpz1jhx.cloudfront.net/vcard/ratio20/images/petitgirl/bg/180x388/a819054b3c1ad73d68478868928b0422.png

// remove Ameba footers on iOS Safari
// TODO: Promise返そう
function removeAgps(): void {
  const agpFooter = document.getElementById('AGP_footer');
  if (agpFooter && agpFooter.parentNode) {
    agpFooter.parentNode.removeChild(agpFooter);
  }

  const globalFooter = document.getElementById('amebaGlobalFooter');
  if (globalFooter && globalFooter.parentNode) {
    globalFooter.parentNode.removeChild(globalFooter);
  }
}

// remove Ameba header and footer on PC
// TODO: Promise返そう
function removeAmbs(): void {
  // ambHeader - PC版のAmebaヘッダ
  const ambHeader = document.getElementById('ambHeader');
  if (ambHeader && ambHeader.parentNode) {
    ambHeader.parentNode.removeChild(ambHeader);
  }
  // ambFooter - PC版のAmebaフッタ
  const ambFooter = document.getElementById('ambFooter');
  if (ambFooter && ambFooter.parentNode) {
    ambFooter.parentNode.removeChild(ambFooter);
  }
}

// @author Rob W <http://stackoverflow.com/users/938089/rob-w>
// Demo: let serialized_html = DOMtoString(document);
function DOMtoString(documentRoot: Document): string {
  let html = '';
  let node = documentRoot.firstChild;
  while (node) {
    console.log(node.nodeType);
    switch (node.nodeType) {
      case Node.ELEMENT_NODE: {
        html += (node as Element).outerHTML;
        break;
      }
      case Node.TEXT_NODE: {
        html += node.nodeValue;
        break;
      }
      case Node.CDATA_SECTION_NODE: {
        html += '<![CDATA[' + node.nodeValue + ']]>';
        break;
      }
      case Node.COMMENT_NODE: {
        html += '<!--' + node.nodeValue + '-->';
        break;
      }
      case Node.DOCUMENT_TYPE_NODE: {
        // (X)HTML documents are identified by public identifiers
        const dt = node as DocumentType;
        html +=
          '<!DOCTYPE ' +
          dt.name +
          (dt.publicId ? ' PUBLIC "' + dt.publicId + '"' : '') +
          (!dt.publicId && dt.systemId ? ' SYSTEM' : '') +
          (dt.systemId ? ' "' + dt.systemId + '"' : '') +
          '>\n';
        break;
      }
      default: {
        // それ以外は無視
        break;
      }
    }
    node = node.nextSibling;
  }
  return html;
}

// Push file keys
// TODO: Promise返そう
function uploadResources(): void {
  const regex = /((c.|)stat100.ameba.jp)|([a-z0-9]*\.cloudfront\.net)\/vcard\/[-a-zA-Z0-9/._+]*\.[a-zA-Z0-9]+/gm;
  let html = DOMtoString(document);
  if (html) {
    // replace all '\/' to '/'
    html = html.replace(/\\\//g, '/');
    let m;
    while ((m = regex.exec(html)) !== null) {
      // This is necessary to avoid infinite loops with zero-width matches
      if (m.index === regex.lastIndex) {
        regex.lastIndex++;
      }

      // The result can be accessed through the `m`-variable.
      // replace all '//' to '/'
      const key = m[0].replace(/\/\//g, '/');
      console.log(key);
      chrome.storage.local.get('urls', value => {
        // 現在の値を更新
        const current: string[] = value.urls ? (value.urls as string[]) : [];
        if (!current.includes(key)) {
          current.push(key); // 必ず後ろから追加すること
          chrome.storage.local.set({ urls: current });
        }
      });
    }
  }
}

// Document全体を Mutation Observer に投げる
// TODO: Promise返そう
// function observeAllDom(): void {
//   const observer = new MutationObserver((mutations, observer) => {
//     mutations.forEach(mutation => {
//       console.log(mutation.type);
//     });
//   });
// }

// ---------------- entry point ----------------
function onDomLoad(): void {
  // TODO: ここでIOを握らないように、Promiseは投げっぱなし
  removeAmbs();
  removeAgps();

  uploadResources();
}

onDomLoad();
