// canvas 初始化
let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')
// 橡皮擦锁，判断用户是否使用橡皮擦或者画笔
let useEraser = false
// 全局变量 —— 颜色控制
let color = 'black'
// 全局的调色板元素，给画笔/橡皮擦/调色板提供调用
let colorBoard = document.querySelector('.color-board > button')
autoSetCanvasPage(canvas)
listenToUser()

// 侧边栏工具条
// 画笔
setPencil()
// 橡皮擦
setEraser()
// 调色板

/*********/

// 画笔功能封装
function drawCircle(x, y, radius, color) {
  ctx.beginPath()
  ctx.fillStyle = color
  ctx.arc(x, y, radius, 0, Math.PI * 2)
  ctx.fill()
}

function drawLine(lastX, lastY, currentX, currentY, color) {
  ctx.beginPath()
  ctx.moveTo(lastX, lastY) // 起点
  ctx.strokeStyle = color
  ctx.lineWidth = 10
  ctx.lineTo(currentX, currentY) // 终点
  ctx.stroke()
}

// canvas画布大小自动化
function autoSetCanvasPage(canvas) {
  setCanvasPage()
  // 监听用户窗口变化，动态改变页面宽高
  window.onresize = function () {
    setCanvasPage()
  }

  // 封装获取用户页面宽高功能
  function setCanvasPage() {
    let pageWidth = document.documentElement.clientWidth
    let pageHeight = document.documentElement.clientHeight
    canvas.width = pageWidth
    canvas.height = pageHeight
  }
}

// 鼠标点击、移动、松开的事件监听
function listenToUser() {
  // 绘画锁，判断用户是否在画画
  let paintingLock = false
  // 记录用户鼠标的位移
  let lastPoint = {
    x: 0,
    y: 0
  }

  // 特性检测
  if (document.body.ontouchstart !== undefined) {
    // 移动端监听touch事件
    canvas.addEventListener('touchstart', function (e) {
      console.log('碰我了', e)

      paintingLock = true
      let x = e.touches[0].clientX
      let y = e.touches[0].clientY

      // 设置lastPoint
      lastPoint.x = x
      lastPoint.y = y

      // 判断用户是否使用的是橡皮擦
      if (useEraser) {
        drawCircle(x, y, 5, 'white')
      } else {
        drawCircle(x, y, 5, color)
      }
    })

    canvas.addEventListener('touchmove', function (e) {
      if (paintingLock) {
        let x = e.touches[0].clientX
        let y = e.touches[0].clientY
        if (useEraser) {
          drawLine(lastPoint.x, lastPoint.y, x, y, 'white')
          drawCircle(x, y, 5, 'white')
        } else {
          drawLine(lastPoint.x, lastPoint.y, x, y, color)
          drawCircle(x, y, 5, color)
        }

        // 一结束就要更新lastPoint的值为最新监听到的点
        lastPoint.x = x
        lastPoint.y = y
      }
    })

    canvas.addEventListener('touchend', function () {
      paintingLock = false
    })
  } else {
    // PC端监听鼠标
    canvas.onmousedown = function (e) {
      paintingLock = true
      let x = e.clientX
      let y = e.clientY

      // 设置lastPoint
      lastPoint.x = x
      lastPoint.y = y

      // 判断用户是否使用的是橡皮擦
      if (useEraser) {
        drawCircle(x, y, 5, 'white')
      } else {
        drawCircle(x, y, 5, color)
      }
    }

    canvas.onmousemove = function (e) {
      if (paintingLock) {
        let x = e.clientX
        let y = e.clientY
        if (useEraser) {
          drawLine(lastPoint.x, lastPoint.y, x, y, 'white')
          drawCircle(x, y, 5, 'white')
        } else {
          drawLine(lastPoint.x, lastPoint.y, x, y, color)
          drawCircle(x, y, 5, color)
        }

        // 一结束就要更新lastPoint的值为最新监听到的点
        lastPoint.x = x
        lastPoint.y = y
      }
    }

    canvas.onmouseup = function () {
      paintingLock = false
    }
  }
}

// 设置画笔
function setPencil() {
  let pencil = document.querySelector('.pencil')
  pencil.addEventListener('click', function (e) {
    console.log(e.target.tagName)
    if (e.target.tagName === 'BUTTON') {
      useEraser = false
      colorBoard.disabled = useEraser
      console.log(2)
    }
  })
}

// 设置橡皮擦
function setEraser() {
  let eraser = document.querySelector('.eraser')
  eraser.addEventListener('click', function (e) {
    console.log(e.target.tagName)
    if (e.target.tagName === 'BUTTON') {
      useEraser = true
      colorBoard.disabled = useEraser
      console.log(1)
    }
  })
}

// 设置调色板
function setColorBoard() {

}


