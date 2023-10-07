let timeout: any = null

/**
 * 防抖
 * @param {Function} func 要执行的回调函数
 * @param {Number} wait 延时的时间
 */
function debounce(func: Function, wait: number = 500) {
  // 清除定时器
  if (timeout !== null) clearTimeout(timeout)
  // 设置定时器，当最后一次操作后，timeout不会再被清除，所以在延时wait毫秒后执行func回调方法
  timeout = setTimeout(function () {
    typeof func === 'function' && func()
  }, wait)
}

export default debounce
