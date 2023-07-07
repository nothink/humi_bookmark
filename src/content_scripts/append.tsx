import React from "react";
import { createRoot } from "react-dom/client";
import { MantineProvider } from "@mantine/core";

import App from "../components/App";

/**
 * 既存DOMにReactのApp rootをくっつける
 */
export const appendRoot = (): void => {
  const elem = document.createElement("div");
  // set up element
  elem.id = "crx-root";
  elem.style.position = "fixed";
  elem.style.top = "0px";
  elem.style.left = "0px";
  elem.style.width = "auto";
  elem.style.height = "auto";

  document.body.append(elem);
  const root = createRoot(elem);

  root.render(
    <React.StrictMode>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <App />
      </MantineProvider>
    </React.StrictMode>,
  );
};
