import isObject from './isObject.js'
import root from './.internal/root.js'

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked, or until the next browser frame is drawn. The debounced function
 * comes with a `cancel` method to cancel delayed `func` invocations and a
 * `flush` method to immediately invoke them. Provide `options` to indicate
 * whether `func` should be invoked on the leading and/or trailing edge of the
 * `wait` timeout. The `func` is invoked with the last arguments provided to the
 * debounced function. Subsequent calls to the debounced function return the
 * result of the last `func` invocation.
 * `wait`：回调上次执行完毕之后 wait 毫秒以后才可以被再次调用
 * `cancel`：取消回调函数延迟调用
 * `flush`：立即调用回调函数
 * `options`：
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * If `wait` is omitted in an environment with `requestAnimationFrame`, `func`
 * invocation will be deferred until the next frame is drawn (typically about
 * 16ms).
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `debounce` and `throttle`.
 *
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0]
 *  The number of milliseconds to delay; if omitted, `requestAnimationFrame` is
 *  used (if available).
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', debounce(calculateLayout, 150))
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }))
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * const debounced = debounce(batchLog, 250, { 'maxWait': 1000 })
 * const source = new EventSource('/stream')
 * jQuery(source).on('message', debounced)
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel)
 *
 * // Check for pending invocations.
 * const status = debounced.pending() ? "Pending..." : "Ready"
 */
function debounce(func, wait, options) {
  let lastArgs, // 上一次回调执行时的参数
    lastThis, // 上一次回调执行时的this
    maxWait, // 最长等待时间
    result, // 回调函数执行结果
    timerId, // 计时器id
    lastCallTime // 函数上一次真正执行的时间

  let lastInvokeTime = 0 // 上次被调用的时间（初始化为0
  let leading = false // 是否在开始的时候先执行一次回调，之后再进行debounce
  let maxing = false // 是否有最 maxWait 参数设置
  let trailing = true // ???

  // Bypass `requestAnimationFrame` by explicitly setting `wait=0`.
  // 显式地将 wait 设置为 0，会默认不适用 rAf 的方式
  const useRAF = (!wait && wait !== 0 && typeof root.requestAnimationFrame === 'function')

  // 一些类型检查
  if (typeof func !== 'function') {
    throw new TypeError('Expected a function')
  }
  wait = +wait || 0
  // 对options的一些内容进行初始化
  if (isObject(options)) {
    leading = !!options.leading // 初始化leading
    maxing = 'maxWait' in options // 初始化 maxing（options里设置了 maxWait 的时候maxing为true
    maxWait = maxing ? Math.max(+options.maxWait || 0, wait) : maxWait
    trailing = 'trailing' in options ? !!options.trailing : trailing // 取options里的Boolean(trailing)
  }

  // 真正回调执行的地方，返回回调函数执行结果
  function invokeFunc(time) {
    // 获取本次执行的 arg 和 this
    const args = lastArgs 
    const thisArg = lastThis

    // 还原为 undefined
    lastArgs = lastThis = undefined
    // 记录本次执行的时间
    lastInvokeTime = time
    // 执行函数并将其执行结果返回
    result = func.apply(thisArg, args)
    return result
  }

  // 启动计时器，wait时间之后执行 pendingFunc
  function startTimer(pendingFunc, wait) {
    // 如果使用 rAF 的话，在下一次界面帧渲染的时候执行 pendingFunc
    if (useRAF) {
      root.cancelAnimationFrame(timerId);
      return root.requestAnimationFrame(pendingFunc)
    }
    // 否则使用普通 setTimeout
    return setTimeout(pendingFunc, wait)
  }

  // 取消计时器
  function cancelTimer(id) {
    if (useRAF) {
      return root.cancelAnimationFrame(id)
    }
    clearTimeout(id)
  }

  // leading 情况下的执行情况
  function leadingEdge(time) {
    // Reset any `maxWait` timer.设置上次被调用的时间为time
    lastInvokeTime = time
    // Start the timer for the trailing edge.  为 traiing 尾部调用开启计时器（waitTime为传入的时间）
    timerId = startTimer(timerExpired, wait)
    // Invoke the leading edge.  如果 options.leading 为true 的话，立即执行回调函数并将其执行结果返回，否则返回当前result（初始情况下为undefined
    return leading ? invokeFunc(time) : result
  }

  // 剩余wait时间
  function remainingWait(time) {
    // 从上次执行到 time 过去了多长时间
    const timeSinceLastCall = time - lastCallTime
    // 从上次调用 到 time 过了多长时间
    const timeSinceLastInvoke = time - lastInvokeTime
    // 再过多久可以执行回调函数
    const timeWaiting = wait - timeSinceLastCall

    // 如果设置了 maxWait 的话，剩余等待时间为 timeWaiting 和 自上次调用到maxWait之间的时间差 里的较小值
    // 否则为 timeWaiting 时间
    return maxing
      ? Math.min(timeWaiting, maxWait - timeSinceLastInvoke)
      : timeWaiting
  }

  /**
   * 在time时刻是否应该被调用
   * @param {*} time 
   */
  function shouldInvoke(time) {
    const timeSinceLastCall = time - lastCallTime // 自上次执行过去了多久
    const timeSinceLastInvoke = time - lastInvokeTime // 自上次调用过去了多久

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    // lastCallTime === undefined —— 回调还没有被执行过
    // timeSinceLastCall >= wait —— 自上次执行已经过了 wait 时间
    // timeSinceLastCall < 0 —— ????
    // 有设置最大等待时间，并且自上次调用已经过去了 maxWait 的时间
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait))
  }

  // 计时器终止
  function timerExpired() {
    const time = Date.now()
    // 如果当前应该执行回调函数的话，返回 trailingEdge  的结果
    if (shouldInvoke(time)) {
      return trailingEdge(time)
    }
    // Restart the timer. 终止之后开始下一轮计时
    timerId = startTimer(timerExpired, remainingWait(time))
  }

  // trailing 执行
  function trailingEdge(time) {
    timerId = undefined

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    // lastArgs有值说明回调函数已经被执行过至少一次了
    // 如果 trailing为true并且不是第一次执行回调函数，那么执行回调函数
    if (trailing && lastArgs) {
      return invokeFunc(time)
    }
    // 如果不是的话
    lastArgs = lastThis = undefined // 更新 lastArgs 和 lastThis 为 undefined
    return result
  }

  // 取消回调函数执行
  function cancel() {
    if (timerId !== undefined) {
      cancelTimer(timerId)
    }
    lastInvokeTime = 0
    lastArgs = lastCallTime = lastThis = timerId = undefined
  }

  // 如果 当前计时器已经清空，则返回上次执行回调函数的结果
  // 如果当前计时器还在记录中，那么执行 trailingEdge
  function flush() {
    return timerId === undefined ? result : trailingEdge(Date.now())
  }

  // 判断当前是否处于一次计时过程中
  function pending() {
    return timerId !== undefined
  }

  // 入口
  function debounced(...args) {
    const time = Date.now() // 记录函数调用时间
    const isInvoking = shouldInvoke(time) // 是否需要调用

    // 记录本次执行的 args、this 和 执行时间
    lastArgs = args
    lastThis = this
    lastCallTime = time

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime)
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = startTimer(timerExpired, wait)
        return invokeFunc(lastCallTime)
      }
    }
    if (timerId === undefined) {
      timerId = startTimer(timerExpired, wait)
    }
    return result
  }
  debounced.cancel = cancel
  debounced.flush = flush
  debounced.pending = pending
  return debounced
}

export default debounce