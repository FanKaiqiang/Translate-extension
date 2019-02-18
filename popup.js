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

let fromSelect = document.querySelector('#from')
let toSelect = document.querySelector('#to')

chrome.storage.sync.get(['sl', 'tl'], function(result) {//页面渲染时从storage中获取选项值
  console.log(result)
  if(result.sl) {
  	fromSelect.value = result.sl.value
  }
  if(result.tl) {
  	toSelect.value = result.tl.value
  }
})

fromSelect.onchange = function() {//选项更新设置storage
	console.log(this.value)
	let key = this.selectedOptions[0].getAttribute('data-key')
	chrome.storage.sync.set({'sl': {key: key, value: this.value}})
}

toSelect.onchange = function() {//选项更新设置storage
	console.log(this.value)
	let key = this.selectedOptions[0].getAttribute('data-key')
	chrome.storage.sync.set({'tl': {key: key, value: this.value}})
}