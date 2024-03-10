
export function debounce (func, wait, options) {
  var lastArgs
  var lastThis
  var maxWait
  var result
  var timerId
  var lastCallTime
  var lastInvokeTime = 0
  var leading = false
  var maxing = false
  var trailing = true

  function isObject (value) {
    var type = typeof value
    return value != null && (type == 'object' || type == 'function')
  }
  var nativeMax = Math.max
  var nativeMin = Math.min
  function now () {
    return Date.now()
  }

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT)
  }

  wait = Number(wait) || 0
  if (isObject(options)) {
    leading = !!options.leading
    maxing = 'maxWait' in options
    maxWait = maxing ? nativeMax(Number(options.maxWait) || 0, wait) : maxWait
    trailing = 'trailing' in options ? !!options.trailing : trailing
  }

  function invokeFunc (time) {
    var args = lastArgs
    var thisArg = lastThis

    lastArgs = lastThis = undefined
    lastInvokeTime = time
    result = func.apply(thisArg, args)
    return result
  }

  function leadingEdge (time) {
    lastInvokeTime = time
    timerId = setTimeout(timerExpired, wait)
    return leading ? invokeFunc(time) : result
  }

  function remainingWait (time) {
    var timeSinceLastCall = time - lastCallTime
    var timeSinceLastInvoke = time - lastInvokeTime
    var timeWaiting = wait - timeSinceLastCall

    return maxing
      ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke)
      : timeWaiting
  }

  function shouldInvoke (time) {
    var timeSinceLastCall = time - lastCallTime
    var timeSinceLastInvoke = time - lastInvokeTime
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait))
  }

  function timerExpired () {
    var time = now()
    if (shouldInvoke(time)) {
      return trailingEdge(time)
    }
    timerId = setTimeout(timerExpired, remainingWait(time))
  }

  function trailingEdge (time) {
    timerId = undefined
    if (trailing && lastArgs) {
      return invokeFunc(time)
    }
    lastArgs = lastThis = undefined
    return result
  }

  function cancel () {
    if (timerId !== undefined) {
      clearTimeout(timerId)
    }
    lastInvokeTime = 0
    lastArgs = lastCallTime = lastThis = timerId = undefined
  }

  function flush () {
    return timerId === undefined ? result : trailingEdge(now())
  }

  function debounced () {
    var time = now()
    var isInvoking = shouldInvoke(time)

    lastArgs = arguments
    lastThis = this
    lastCallTime = time

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime)
      }
      if (maxing) {
        clearTimeout(timerId)
        timerId = setTimeout(timerExpired, wait)
        return invokeFunc(lastCallTime)
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait)
    }
    return result
  }
  debounced.cancel = cancel
  debounced.flush = flush
  return debounced
}
