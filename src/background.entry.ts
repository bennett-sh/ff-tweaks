browser.tabs.onCreated.addListener(tab => {
  const handleTabUpdate = (tabId, changeInfo) => {
    if (tabId === tab.id && changeInfo.url) {
      const url = new URL(changeInfo.url)

      if (url.hostname === 'chatgpt.com' && (url.pathname === '/' || url.pathname.startsWith('/c/'))) {
        browser.tabs.query({
          currentWindow: true,
          pinned: true,
          url: 'https://chatgpt.com/*'
        }).then(tabs => {
          if (!tabs || tabs.length < 1) return
          const pinnedTab = tabs[0]

          browser.tabs.update(pinnedTab.id, {
            active: true,
            url: changeInfo.url // force create new chat
          })
          browser.tabs.remove(tabId)
        })
      }

      browser.tabs.onUpdated.removeListener(handleTabUpdate)
    }
  }

  browser.tabs.onUpdated.addListener(handleTabUpdate)
})
