let debounceTimer: NodeJS.Timeout | null , throttleTimer: NodeJS.Timeout | null

// 防抖
export const debounce = (fn: Function, delay: number) :Function => {
  return (...args: unknown[]) => {
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }
    debounceTimer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
};
// 节流
export const throttle = (fn: Function, delay: number) :Function => {
  return (...args: unknown[]) => {
    if (throttleTimer) {
      return;
    }
    throttleTimer = setTimeout(() => {
      fn.apply(this, args);
      throttleTimer = null;
    }, delay);
  }
}
