var aList = null
var carouselWrapper = null
var prevBtn = null
var nextBtn = null
var dots = null
var dotsParent = null


class Broadcast {
  constructor(interval) {
    this.width = 520
    this.activeItem = 0
    this.interval = interval
    this.lastSlideTime = new Date().getTime()
    this._timer = null
    this.init()
  }

  init = () => {
    this.preventDefaultJump()
    this.carouselControl()
    this.dotJump()
    this.autoplay()
  }

  // 阻止 a标签默认行为
  preventDefaultJump = () => {
    for (let i = 0; i < aList.length; i++) {
      aList[i].addEventListener('click', function(evt) {
        evt.preventDefault()
      }, false)
    }
  }

  // 左右按钮的控制功能
  carouselControl = () => {
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault()
      this.slide(-1)
    })
    nextBtn.addEventListener('click', () => {
      this.slide(1)
      // return false
    })
  }

  // 点击dot跳转
  dotJump = () => {
    dotsParent.addEventListener('click', (e) => {
      const targetAct = e.target.id.split('-')[2] - 1
      this.slide(targetAct - this.activeItem)
    })
    // for (let i = 0; i < dots.length; i ++) {
    //   const dot = dots[i]
    //   dot.addEventListener('click', (e) => {
    //     const targetAct = i
    //     this.slide(targetAct - this.activeItem)
    //   })
    // }
  }

  // 向左（-1）或向右（1）滑动一格
  slide = (step) => {
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
      
    } else {
      // 向左移动
      
      // 若当前已经移动到第一个元素，则跳到最后一个重复元素
      if (activeItem === 0) {
        carouselWrapper.style.transition = 'none'
      } else {
        this.lastSlideTime = new Date().getTime()
      }
    }
    activeItem = (activeItem + step + 6) % 6
    // 根据activeItem调整小圆点active
    Array.prototype.forEach.call(dots, (dot, index) => {
      if (index === activeItem || (index === 0 && activeItem === 5)) {
        dot.classList.add('active-carousel-index-btn')
      } else {
        dot.classList.remove('active-carousel-index-btn')
      }
    })

    this.activeItem = activeItem
    carouselWrapper.style.transform = `translateX(${-activeItem * this.width}px)`

    setTimeout(() => {
      carouselWrapper.style.transition = transition
      // 向右移动后到达了开头，说明之前到了末尾重复的a元素
      if (activeItem === 0 && step > 0) {
        this.slide(1)
      } else if (activeItem === 5 && step < 0) {
        // 向左移动后到达了最后一个，说明之前定位为第一个元素
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
  autoplay = () => {
    this._timer = setTimeout(this.play, this.interval)
  }
}

window.onload = function() {
  aList = document.getElementsByTagName('a');
  carouselWrapper = document.querySelector('.carousel-item-wrapper')
  prevBtn = document.querySelector('#prev')
  nextBtn = document.querySelector('#next')
  dots = document.getElementsByClassName('carousel-index-btn')
  dotsParent = document.getElementsByTagName('ul')[0]

  const broadcast = new Broadcast(2000)
}



