import { defineManifest } from '@crxjs/vite-plugin'
import packageJson from '../package.json'
const { version } = packageJson

// Convert from Semver (example: 0.1.0-beta6)
const [major, minor, patch, label = '0'] = version
  // can only contain digits, dots, or dash
  .replace(/[^\d.-]+/g, '')
  // split into version parts
  .split(/[.-]/)

export default defineManifest(async (env) => ({
  manifest_version: 3,
  name:
    env.mode === 'staging'
      ? '[INTERNAL] 文緒ブックマーク v2'
      : '文緒ブックマーク v2',
  version: `${major}.${minor}.${patch}.${label}`,
  version_name: version,
  description: 'GF(仮)の効率化拡張',
  icons: { 128: 'humio_128.png' },
  action: { default_popup: 'index.html' },
  background: {
    service_worker: 'src/service_worker/index.ts',
    type: 'module',
  },
  content_scripts: [
    {
      matches: ['*://vcard.ameba.jp/*'],
      js: ['src/content_scripts/index.ts'],
    },
  ],
  declarative_net_request: {
    rule_resources: [
      {
        id: 'chrome_pc',
        enabled: true,
        path: 'rules/chrome_pc.json',
      },
    ],
  },

  permissions: ['declarativeNetRequest', 'declarativeNetRequestFeedback'],

  host_permissions: ['*://vcard.ameba.jp/*'],
}))
