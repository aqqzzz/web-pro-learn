// 想用 requestAnimationFrame、setInterval、setTimeout尝试一下
function addLoadEvent(func) {
  const oldLoad = window.onload
  if (typeof oldLoad !== 'function') {
    window.onload = func
  } else {
    window.onload = function() {
      oldLoad.apply(window)
      func()
    }
  }
}

addLoadEvent(preventDefaultJump)
addLoadEvent(carouselControl)
addLoadEvent(dotJump)
addLoadEvent(autoSlide)

const carouselInfo = {
  width: 520,
  trueItemNum: 5,
  itemNum: 7,
  totalWidth: 7*520,
  activeItem: 1
}

function preventDefaultJump() {
  const aList = document.getElementsByTagName('a');
  (window).c = document.querySelector('.carousel-item-wrapper');
  for (let i = 0; i < aList.length; i++) {
    aList[i].addEventListener('click', function(evt) {
      evt.preventDefault()
    }, false)
  }
}

function carouselControl() {
  const prevBtn = document.querySelector('#prev')
  const nextBtn = document.querySelector('#next')
  prevBtn.addEventListener('click', function(e) {
    e.preventDefault()
    // new Promise((resolve) => {
    //   slide(-1)
    //   resolve()
    // }).then(() => {
    //   dotSlide()
    // })
    slide(-1)
    clearInterval(_timer)
    auto = false
  })
  nextBtn.addEventListener('click', function(evt) {
    // new Promise((resolve) => {
    //   slide(1)
    //   resolve()
    // }).then(() => {
    //   dotSlide()
    // })
    slide(1)
    clearInterval(_timer)
    auto = false
    return false
  })
}

// 下方dot点击跳转
function dotJump() {
  const dots = document.getElementsByClassName('carousel-index-btn')
  for (let i = 0; i < dots.length; i++) {
    const dot = dots[i]
    dot.addEventListener('click', (evt) => {
      const activeItem = parseInt(dot.getAttribute('id').split('-')[2])
      if (carouselInfo.activeItem < activeItem) {
        step = 1
      } else if (carouselInfo.activeItem > activeItem) {
        step = -1
      } else {
        return
      }
      clearInterval(_timer)
      auto = false
      let j = carouselInfo.activeItem
      while(j != activeItem) {
        slide(step)
        j += step
      }
      // dotSlide()

    })
  }
}

function dotSlide() {
  let activeItem = carouselInfo.activeItem
  if (activeItem === 6) {
    activeItem = 1
  } else if (activeItem === 0) {
    activeItem = 5
  }
  // carouselInfo.activeItem = activeItem
  let dots = document.querySelectorAll('.carousel-index-btn')
  // dots = Array.prototype.slice.apply(dots)
  for (let i = 0; i < dots.length; i++) {
    const dot = dots[i]
    if (dot.getAttribute('id') === `carousel-to-${activeItem}`) {
      dot.classList.add('active-carousel-index-btn')
    } else {
      dot.classList.remove('active-carousel-index-btn')
    }
  }
}

// 左右滑动，通过carouselInfo中的activeItem以及step来确定当前translate的x值
function slide(step) {
  let itemWrapper = document.querySelector('.carousel-item-wrapper');
  
  (window).carouselInfo = carouselInfo
  let activeItem = carouselInfo.activeItem
  let transition = itemWrapper.style.transition

  if (step > 0) {
    if (activeItem === 6) {
      itemWrapper.style.transition = 'none'
    }
    activeItem = activeItem < 6 ? activeItem + 1 : 1
  } else {
    if (activeItem === 0) {
      itemWrapper.style.transition = 'none'
    }
    activeItem = activeItem > 0 ? activeItem - 1 : 5
  }
  carouselInfo.activeItem = activeItem
  
  itemWrapper.style.transform = `translateX(${-activeItem*carouselInfo.width}px)`
  let dots = document.querySelectorAll('.carousel-index-btn')
  // dots = Array.prototype.slice.apply(dots)
  for (let i = 0; i < dots.length; i++) {
    const dot = dots[i]
    if (dot.getAttribute('id') === `carousel-to-${activeItem === 6 ? 1 : (activeItem === 0) ? 5 : activeItem}`) {
      dot.classList.add('active-carousel-index-btn')
    } else {
      dot.classList.remove('active-carousel-index-btn')
    }
  }
  
  // 函数执行完毕之后transition恢复原值（事件循环），避免在transform结束之前恢复transition动画效果
  setTimeout(function() {
    itemWrapper.style.transition = transition
    if (activeItem === 1 && step > 0) {  // 判断条件需要注意
      slide(1)
    } else if (activeItem === 5 && step < 0) {
      slide(-1)
    }

    // if (!auto) {
    //   _timer = setInterval(function() {
    //     slide(1)
    //   }, 2000)
    // }
  }, 20)
  
}
var auto = true
var _timer
// remain 自动slide的方法
// 问题：在clearInterval之后如何自动重新开始滑动
function autoSlide () {
  
  _timer = setInterval(function() {
    slide(1)
    auto = true
  }, 2000)
  
  
}

/**
 * 问题：
 * 1. 鼠标点击前进后退或者点击dot跳转之后，应该停止自动跳转，滑动到目标位置之后恢复计时（怎么实现）
 * 2. 可以使用 setTimeout 或者 requestAnimationFrame实现吗
 * 
 * 需改进：
 * 1. 所有元素应该在一开始就拿到，不应该在用到的时候才去拿（dom操作耗时）
 * 2. 数据和行为在一起，应该把carouselInfo的数据和与它相关的操作放在一个class里进行操作
 * 3. 用setTimeout替代 setInterval，可以手动调整开始和停止的时间（而且不会有setInterval被吞掉的情况）
 */