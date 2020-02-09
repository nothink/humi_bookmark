'use strict';

/**
 * remove Ameba footers on iOS Safari
 */
const removeAgps = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      const agpFooter = document.getElementById('AGP_footer');
      if (agpFooter && agpFooter.parentNode) {
        agpFooter.parentNode.removeChild(agpFooter);
      }

      const globalFooter = document.getElementById('amebaGlobalFooter');
      if (globalFooter && globalFooter.parentNode) {
        globalFooter.parentNode.removeChild(globalFooter);
      }
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

/**
 * remove Ameba header and footer on PC
 */
const removeAmbs = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
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
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

// @author Rob W <http://stackoverflow.com/users/938089/rob-w>
// Demo: let serialized_html = domToString(document);
const domToString = (rootNode: Node): string => {
  let html = '';
  let node: Node | null;
  if (rootNode instanceof Document) {
    node = rootNode.firstChild;
  } else {
    node = rootNode;
  }
  while (node) {
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
};

/**
 * pushContentUrl: URLをローカルストレージにpushする(Content Script版)
 * @param url string URL文字列
 */
const pushContentUrl = (url: string): void => {
  // storageをこっちからアクセスしない(backgroundではPromiseでラップ)
  // ようにしているので、sendMessageでurlを送る
  chrome.runtime.sendMessage({ url: url });
};

// Push file keys
/**
 * 既存のDOMを再構築して、その中からURL文字列を探してpushする
 */
const pushResources = (node: Node): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      const regex = /((c.|)stat100.ameba.jp)|([a-z0-9]*\.cloudfront\.net)\/vcard\/[-a-zA-Z0-9/._+]*\.(?!build)[a-zA-Z0-9]+/gm;
      let html = domToString(node);
      if (html) {
        // replace all '\/' to '/'
        html = html.replace(/\\\//g, '/');
        const urls: string[] = [];
        let m;
        while ((m = regex.exec(html)) !== null) {
          // This is necessary to avoid infinite loops with zero-width matches
          if (m.index === regex.lastIndex) {
            regex.lastIndex++;
          }
          // The result can be accessed through the `m`-variable.
          pushContentUrl(m[0]);
          urls.push(m[0]);
        }
        console.log(urls);
      }
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

/**
 * 該当Node全体を Mutation Observer に投げる
 * @param node 変更監視をするNode
 */
function observeResources(node: Node): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
          console.log(mutation.type);
          pushResources(mutation.target);
        });
      });
      observer.observe(node, {
        attributes: true,
        characterData: true,
        childList: true,
        subtree: true,
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
}

// ---------------- entry point ----------------
/**
 * DOMがロードされた時に呼ばれるエントリーポイント
 */
function onDomLoad(): void {
  // ここでIOを握らないように、Promiseは投げっぱなし
  removeAmbs();
  removeAgps();

  pushResources(document);
  observeResources(document);
}

onDomLoad();
