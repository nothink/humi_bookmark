import React from "react";
import { createRoot } from "react-dom/client";
import { MantineProvider } from "@mantine/core";

import App from "../components/App";

/**
 * 既存DOMにReactのrootをくっつける
 * ついでに既存DOMから引っこ抜いたvcardリソースのURLがあるなら対応する
 * @param vcards 既存DOMから引っこ抜いてきたvcardリソースのURL
 */
export const appendRoot = (vcards: string[]): void => {
  const elem = document.createElement("div");
  // set up element
  elem.id = "crx-root";
  elem.style.position = "absolute";
  elem.style.top = "0px";
  elem.style.left = "0px";
  elem.style.width = "auto";
  elem.style.height = "auto";

  document.body.append(elem);
  const root = createRoot(elem);

  console.log(vcards);

  root.render(
    <React.StrictMode>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <App />
      </MantineProvider>
    </React.StrictMode>
  );
};
