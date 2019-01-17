let select = document.querySelector('#select')//选取浮层中的选项元素

chrome.storage.sync.get(['switch'], function (result) {//打开弹窗时获取当前页面switch的storage
  select.value = result.switch ? result.switch : null
})


select.onchange = function () {//当选项元素的值改变时
  chrome.storage.sync.set({ 'switch': this.value })//将value作为switch的storage存放
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {//选取活跃的tab
    chrome.tabs.sendMessage(tabs[0].id, { switch: this.value })//将value作为信息发出
  })
}