function throttle(func: () => void, wait: number = 300) {
  let timer: any,
    previous = 0,
    result: any;
  return function proxy() {
    var now = +new Date(),
      remaining = wait - (now - previous),
      self = this,
      params: any = [].slice.call(arguments);
    if (remaining <= 0) {
      // 立即执行即可
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      result = func.apply(self, params);
      previous = +new Date();
    } else if (!timer) {
      // 没有达到间隔时间，而且之前也没有设置过定时器，此时我们设置定时器，等到remaining后执行一次
      timer = setTimeout(function () {
        if (timer) {
          clearTimeout(timer);
          timer = null;
        }
        result = func.apply(self, params);
        previous = +new Date();
      }, remaining);
    }
    return result;
  };
}

export default throttle;
