var aList = null
var carouselWrapper = null
var prevBtn = null
var nextBtn = null
var dots = null


class Broadcast {
  constructor(interval) {
    this.width = 520
    this.activeItem = 0
    this.interval = interval
    this.lastSlideTime = new Date().getTime()
    this._timer = null
    this.init()
  }

  // addLoadEvent(func) {
  //   const oldLoad = window.onload
  //   const _that = this
  //   if (typeof oldLoad !== 'function') {
  //     window.onload = func.bind(_that)
  //   } else {
  //     window.onload = function() {
  //       oldLoad.apply(_that)
  //       func.apply(_that)
  //     }
  //   }
  // }

  init() {
    this.preventDefaultJump()
    this.carouselControl()
    this.dotJump()
    this.autoplay()
  }

  // 阻止 a标签默认行为
  preventDefaultJump() {
    for (let i = 0; i < aList.length; i++) {
      aList[i].addEventListener('click', function(evt) {
        evt.preventDefault()
      }, false)
    }
  }

  // 左右按钮的控制功能
  carouselControl() {
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault()
      this.slide(-1)
    })
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault()
      this.slide(1)
    })
  }

  // 点击dot跳转
  dotJump() {
    for (let i = 0; i < dots.length; i ++) {
      const dot = dots[i]
      dot.addEventListener('click', (e) => {
        const targetAct = i
        this.slide(targetAct - this.activeItem)
        // const step = this.activeItem - targetAct > 0 ? -1 : 1
        // while (this.activeItem != targetAct) {
        //   this.slide(step)
        // }
      })
    }
  }

  // 向左（-1）或向右（1）滑动一格
  slide(step) {
    let transition = carouselWrapper.style.transition
    let activeItem = this.activeItem
    // 向右移动
    if (step > 0) {
      // 若当前已经移动到重复元素a
      if (activeItem === 5) {
        carouselWrapper.style.transition = 'none'
      } else {
        this.lastSlideTime = new Date().getTime()
      }
      activeItem = activeItem === 5 ? 0 : activeItem + step
    } else {
      // 向左移动
      
      // 若当前已经移动到第一个元素，则跳到最后一个重复元素
      if (activeItem === 0) {
        carouselWrapper.style.transition = 'none'
      } else {
        this.lastSlideTime = new Date().getTime()
      }
      activeItem = activeItem === 0 ? 5 : activeItem + step
    }
    // 根据activeItem调整小圆点active
    let activeId = activeItem === 5 ? 1 : activeItem + 1 
    Array.prototype.forEach.call(dots, (dot) => {
      if (dot.getAttribute('id') === `carousel-to-${activeId}`) {
        dot.classList.add('active-carousel-index-btn')
      } else {
        dot.classList.remove('active-carousel-index-btn')
      }
    })

    this.activeItem = activeItem
    carouselWrapper.style.transform = `translateX(${-activeItem * this.width}px)`

    setTimeout(() => {
      carouselWrapper.style.transition = transition
      // 向右移动一步后到达了开头，说明之前到了末尾重复的a元素
      if (activeItem === 0 && step > 0) {
        this.slide(1)
      } else if (activeItem === 5 && step < 0) {
        // 向左移动一步后到达了最后一个，说明之前定位为第一个元素
        this.slide(-1)
      }
    }, 20)

  }
  play = () => {
    const current = new Date().getTime()
    const duration = current - this.lastSlideTime
    if (duration >= this.interval) {
      this.slide(1)
      this.lastSlideTime = current
    }
    clearTimeout(this._timer)

    this._timer = setTimeout(this.play, this.interval)
    
  }
  autoplay() {
    this._timer = setTimeout(this.play, this.interval)
  }
}

window.onload = function() {
  aList = document.getElementsByTagName('a');
  carouselWrapper = document.querySelector('.carousel-item-wrapper')
  prevBtn = document.querySelector('#prev')
  nextBtn = document.querySelector('#next')
  dots = document.getElementsByClassName('carousel-index-btn')

  const broadcast = new Broadcast(2000)
}

/**
 * 问题：
 * 1. 为什么要把所有dom操作集中提前？（和页面性能优化有关系吗：不需要再每次调用方法的时候获取dom
 * 2. 为什么要用 setTimeout 替代 setInterval？可以随时调整下一次调用的时机
 * 3. class里的this指向：使用箭头函数绑定
 * 
 * 需改进：
 * 1. 类里需要用到this的方法，都要用箭头函数绑定this为当前实例
 * 2. slide 循环队列，使用mod（取模）进行计算
 * 3. 采用事件委托的方式，减少注册事件的数量
 */


