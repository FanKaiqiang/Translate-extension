class Panel {
  constructor() {
    this.create()
    this.bind()
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

  translate(raw) {
    this.container.querySelector('.source .content').innerText = raw//将选中内容填入待翻译区
    fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=zh&dt=t&q=${raw}`)
      .then(res => res.json())
      .then(result => {
        this.container.querySelector('.dest .content').innerText = result[0][0][0]
      })//谷歌的翻译API
  }

  setPos(x,y) {//设定浮层位置并展示浮层
    this.container.style.top = y + 'px'
    this.container.style.left = x + 'px'
    this.container.classList.add('show')//
  }
}

let panel = new Panel()//新建实例
// let panelSwitch = 'off'
document.onclick = function (e) {
  var selectStr = window.getSelection().toString().trim()//获取选中的值并去除前后空格 
  if (selectStr === '') return//如果此次点击没有选中就不开启浮层
  // if(panelSwitch === 'off') return
  panel.translate(selectStr)//翻译
  panel.setPos(e.clientX,e.clientY)//展示浮层
}