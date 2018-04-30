// canvas 初始化
let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')
// 橡皮擦锁，判断用户是否使用橡皮擦或者画笔
let useEraser = false
// 全局变量 —— 颜色控制
let color = 'black'
// 全局变量 —— 画笔大小控制
let pencilSize = 4
// 全局的调色板元素，给画笔/橡皮擦/调色板提供调用
let colorBoard = document.querySelector('.color-board > button')
// 获取到input-color，便于调节颜色
let inputColor = document.querySelector('.buttons > .color-board input')
autoSetCanvasPage(canvas)
listenToUser()

// 侧边栏工具条
// 铅笔
setPencil()
// 毛笔
setBrush()
// 橡皮擦
setEraser()
// 重置画板
setClearCanvas()

// 设置toggleClass
toggleClass()
/*********/

// 画笔功能封装
function drawCircle(x, y, radius, color) {
  radius = radius / 2
  ctx.beginPath()
  ctx.fillStyle = color
  ctx.arc(x, y, radius, 0, Math.PI * 2)
  ctx.fill()
}

function drawLine(lastX, lastY, currentX, currentY, color, pencilSize) {
  ctx.beginPath()
  ctx.moveTo(lastX, lastY) // 起点
  ctx.strokeStyle = color
  ctx.lineWidth = pencilSize
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

// 点击、移动、松开的事件监听
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
      // 只要开始画，就立刻将inputColor.value赋值给color
      color = inputColor.value

      let x = e.touches[0].clientX
      let y = e.touches[0].clientY

      // 设置lastPoint
      lastPoint.x = x
      lastPoint.y = y

      // 判断用户是否使用的是橡皮擦
      if (useEraser) {
        drawCircle(x, y, pencilSize, 'white')
      } else {
        drawCircle(x, y, pencilSize, color)
      }
    })

    canvas.addEventListener('touchmove', function (e) {
      if (paintingLock) {
        let x = e.touches[0].clientX
        let y = e.touches[0].clientY
        if (useEraser) {
          drawLine(lastPoint.x, lastPoint.y, x, y, 'white', pencilSize)
          drawCircle(x, y, pencilSize, 'white')
        } else {
          drawLine(lastPoint.x, lastPoint.y, x, y, color, pencilSize)
          drawCircle(x, y, pencilSize, color)
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
      // 只要开始画，就立刻将inputColor.value赋值给color
      color = inputColor.value

      let x = e.clientX
      let y = e.clientY

      // 设置lastPoint
      lastPoint.x = x
      lastPoint.y = y

      // 判断用户是否使用的是橡皮擦
      if (useEraser) {
        drawCircle(x, y, pencilSize, 'white')
      } else {
        drawCircle(x, y, pencilSize, color)
      }
    }

    canvas.onmousemove = function (e) {
      if (paintingLock) {
        let x = e.clientX
        let y = e.clientY
        if (useEraser) {
          drawLine(lastPoint.x, lastPoint.y, x, y, 'white', pencilSize)
          drawCircle(x, y, pencilSize, 'white')
        } else {
          drawLine(lastPoint.x, lastPoint.y, x, y, color, pencilSize)
          drawCircle(x, y, pencilSize, color)
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

// 设置铅笔事件监听
function setPencil() {
  let pencilButton = document.querySelector('.pencil > button')
  pencilButton.addEventListener('click', function () {
    useEraser = false
    pencilSize = 4
  })
}

// 设置毛笔事件监听
function setBrush() {
  let brushButton = document.querySelector('.brush > button')
  brushButton.addEventListener('click', function () {
    useEraser = false
    pencilSize = 10
  })
}

// 设置橡皮擦事件监听
function setEraser() {
  let eraserButton = document.querySelector('.eraser > button')
  eraserButton.addEventListener('click', function () {
    useEraser = true
    pencilSize = 20
  })
}

// toggleClass
function toggleClass() {
  let selectors = document.querySelectorAll('.buttons .selector')
  for (let i = 0; i < selectors.length; i++) {
    selectors[i].addEventListener('click', function (e) {
      for (let j = 0; j < selectors.length; j++) {
        selectors[j].classList.remove('active')
      }
      e.currentTarget.classList.add('active')
    })
  }
}

// 清空画板
function setClearCanvas() {
  let clear = document.querySelector('.reset-board > button')
  clear.addEventListener('click', function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  })
}



