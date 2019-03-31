const aList = document.getElementsByTagName('a');
let carouselWrapper = document.querySelector('.carousel-item-wrapper')
const prevBtn = document.querySelector('#prev')
const nextBtn = document.querySelector('#next')
const dots = document.getElementsByClassName('carousel-index-btn')


class Broadcast {
  constructor(interval) {
    this.width = 520
    this.activeItem = 0
    this.interval = interval
    this.lastSlideTime = new Date().getTime()
    this._timer = null
    this.init()
  }

  addLoadEvent(func) {
    const oldLoad = window.onload
    const _that = this
    if (typeof oldLoad !== 'function') {
      window.onload = func.bind(_that)
    } else {
      window.onload = function() {
        oldLoad.apply(_that)
        func.apply(_that)
      }
    }
  }

  init() {
    console.log(this)
    this.addLoadEvent(this.preventDefaultJump)
    this.addLoadEvent(this.carouselControl)
    this.addLoadEvent(this.dotJump)
    this.addLoadEvent(this.autoplay)
  }

  // 阻止 a标签默认行为
  preventDefaultJump() {
    console.log('a', this)
    for (let i = 0; i < aList.length; i++) {
      aList[i].addEventListener('click', function(evt) {
        evt.preventDefault()
      }, false)
    }
  }

  // 左右按钮的控制功能
  carouselControl() {
    console.log(this)
    const _that = this
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault()
      this.slide(-1)
    })
    nextBtn.addEventListener('click', function() {
      _that.slide(1)
      return false
    })
  }

  // 点击dot跳转
  dotJump() {
    for (let i = 0; i < dots.length; i ++) {
      const dot = dots[i]
      dot.addEventListener('click', (e) => {
        // const targetAct = i
        // this.slide(targetAct - this.activeItem)
        const step = this.activeItem - targetAct > 0 ? -1 : 1
        while (this.activeItem != targetAct) {
          this.slide(step)
        }
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
    requestAnimationFrame(this.play)
    
  }
  autoplay() {
    requestAnimationFrame(this.play)
  }
}

const broadcast = new Broadcast(2000)

/**
 * 需改进：
 * 1. 不应该用requestAnimationFrame，该方法用于手动修改动画的每一帧，适用于动画改动频率较高的场景，当前场景频率较低，用这个方法会消耗大量ziyuan
 * 2. that = this 在类里尽量不用（？？？）
 * 3. BroadCast类应该只关注 轮播相关逻辑，onload应该放到外面
 * 4. dotJump函数，可以给slide 直接传步长（其他情况下slide只能传1或-1），这种情况不会发生到达边界需要回退的情况
 */