const ua =
  'Mozilla/5.0 (Windows NT 6.3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36'

const condition: chrome.declarativeNetRequest.RuleCondition = {
  isUrlFilterCaseSensitive: false,
  requestDomains: ['vcard.ameba.jp'],
  resourceTypes: Object.values(chrome.declarativeNetRequest.ResourceType),
}

const action: chrome.declarativeNetRequest.RuleAction = {
  type: chrome.declarativeNetRequest.RuleActionType.MODIFY_HEADERS,
  requestHeaders: [
    {
      operation: chrome.declarativeNetRequest.HeaderOperation.SET,
      header: 'user-agent',
      value: ua,
    },
  ],
}

const one: chrome.declarativeNetRequest.Rule = {
  id: 1,
  priority: 1,
  action,
  condition: {
    ...condition,
  },
}

console.log(one)

export const declareHeader = (): void => {}
