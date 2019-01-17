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