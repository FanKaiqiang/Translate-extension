chrome.runtime.onInstalled.addListener(function () {
  chrome.contextMenus.create({//创建翻译菜单选项
    "id": "translateMenu",
    "title": "Translate'%s'",
    "contexts": ["selection"]
  })
})

chrome.contextMenus.onClicked.addListener(function (info) {//点击菜单监听
  if (info.menuItemId === 'translateMenu') {//跳转到翻译界面
    chrome.tabs.create({ url: `https://translate.google.cn/#view=home&op=translate&sl=auto&tl=auto&text=${info.selectionText}` })
  }
})