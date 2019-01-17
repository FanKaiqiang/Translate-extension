class Panel {
  constructor() {
    this.switch = 'off'
    this.create()
    this.bind()
    this.listener()
  }

  create() {//创建浮层，并将其插入页面中
    let html = `<div class="_panel_header">小谷翻译 <span class="close">X</span></div>
    <div class="_panel_main">
      <div class="source">
        <div class="title">英语</div>
        <div class="content"></div>
      </div>
      <div class="dest">
        <div class="title">简体中文</div>
        <div class="content">...</div>
      </div>
    </div>`
    let container = document.createElement('div')
    container.innerHTML = html
    container.classList.add('_panel')
    document.body.appendChild(container)
    this.container = container
  }

  bind() {//为浮层的点击按钮绑定点击事件
    this.container.querySelector('.close').onclick = () => {
      this.container.classList.remove('show')
    }
  }

  listener() {
    chrome.runtime.onMessage.addListener(//监听消息的发送
      (request) => {
        this.switch = request.switch ? request.switch : null//将翻译开关状态改变
        if (this.switch === 'off') {
          this.container.classList.remove('show')
        }
      }
    )

  }

  translate(raw) {
    let slValue = 'en'
    let tlValue = 'zh-CN'
    chrome.storage.sync.get(['sl', 'tl'], (result) => {//获取storage中语言设定的值
      if (result.sl) {
        slValue = result.sl.value
        this.container.querySelector('.source .title').innerText = result.sl.key
      }
      if (result.tl) {
        tlValue = result.tl.value
        this.container.querySelector('.dest .title').innerText = result.tl.key
      }

      this.container.querySelector('.source .content').innerText = raw//将选中内容填入待翻译区
      fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=${slValue}&tl=${tlValue}&dt=t&q=${raw}`)
        .then(res => res.json())
        .then(result => {
          this.container.querySelector('.dest .content').innerText = result[0][0][0]
        })//谷歌的翻译API
    })
  }
  setPos(x, y) {//设定浮层位置并展示浮层
    this.container.style.top = y + 'px'
    this.container.style.left = x + 'px'
    this.container.classList.add('show')
  }
}

let panel = new Panel()//新建实例
chrome.storage.sync.get(['switch'], function (result) {//获取switch的storage
  panel.switch = result.switch ? result.switch : null
})

document.onclick = function (e) {//文档点击事件
  var selectStr = window.getSelection().toString().trim()//获取选中的值并去除前后空格 
  if (selectStr === '' || panel.switch === 'off') return
  panel.translate(selectStr)
  panel.setPos(e.clientX, e.clientY)
}

document.addEventListener('visibilitychange', function () { //浏览器切换事件
  chrome.storage.sync.set({ 'switch': panel.switch })//将value作为switch的storage存放
})