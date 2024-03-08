function throttle(func: (...args: any[]) => void, wait: number) {
  let timeoutId: NodeJS.Timeout | null = null;

  return function (...args: Parameters<typeof func>) {
    if (!timeoutId) {
      func.apply(this, args);
      timeoutId = setTimeout(() => {
        timeoutId = null;
      }, wait);
    }
  };
}

export { throttle };
