// https://dqx9mbrpz1jhx.cloudfront.net/vcard/ratio20/images/petitgirl/bg/180x388/a819054b3c1ad73d68478868928b0422.png

// remove Ameba footers on iOS Safari
function removeAgps(): void {
  const agpFooter = document.getElementById("AGP_footer");
  if (agpFooter && agpFooter.parentNode) {
    agpFooter.parentNode.removeChild(agpFooter);
  }

  const globalFooter = document.getElementById("amebaGlobalFooter");
  if (globalFooter && globalFooter.parentNode) {
    globalFooter.parentNode.removeChild(globalFooter);
  }
}

// remove Ameba header and footer on PC
function removeAmbs(): void {
  // ambHeader - PC版のAmebaヘッダ
  const ambHeader = document.getElementById("ambHeader");
  if (ambHeader && ambHeader.parentNode) {
    ambHeader.parentNode.removeChild(ambHeader);
  }
  // ambFooter - PC版のAmebaフッタ
  const ambFooter = document.getElementById("ambFooter");
  if (ambFooter && ambFooter.parentNode) {
    ambFooter.parentNode.removeChild(ambFooter);
  }
}

function onSiteLoad(): void {
  removeAmbs();
  removeAgps();
}

onSiteLoad();
