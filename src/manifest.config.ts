import { defineManifest } from "@crxjs/vite-plugin";
import packageJson from "../package.json";
const { version } = packageJson;

// Convert from Semver (example: 0.1.0-beta6)
const [major, minor, patch, label = "0"] = version
  // can only contain digits, dots, or dash
  .replace(/[^\d.-]+/g, "")
  // split into version parts
  .split(/[.-]/);

/**
 * Manifest definitions of this Chrome Extensions
 */
export default defineManifest(async (env) => ({
  manifest_version: 3,
  name:
    env.mode === "staging"
      ? "[INTERNAL] 文緒ブックマーク v2"
      : "文緒ブックマーク v2",
  version: `${major}.${minor}.${patch}.${label}`,
  version_name: version,
  description: "GF(仮)の効率化拡張",
  icons: { 128: "humio_128.png" },

  permissions: [
    "alarms",
    "declarativeNetRequest",
    "declarativeNetRequestFeedback",
    "storage",
    "webRequest",
  ],

  host_permissions: [
    "https://vcard.ameba.jp/*",
    "https://dqx9mbrpz1jhx.cloudfront.net/vcard/*",
  ],

  action: {
    default_title: "文緒ブックマーク v2",
  },

  background: {
    service_worker: "src/service_worker/index.ts",
    type: "module",
  },

  content_scripts: [
    {
      matches: ["*://vcard.ameba.jp/*"],
      js: ["src/content_scripts/end.ts"],
      run_at: "document_end",
    },
    {
      matches: ["*://vcard.ameba.jp/*"],
      js: ["src/content_scripts/idle.ts"],
      run_at: "document_idle",
    },
  ],
  declarative_net_request: {
    rule_resources: [
      {
        id: "chrome_pc",
        enabled: true,
        path: "rules/chrome_pc.json",
      },
    ],
  },
}));
