export default function debounce(fn: Function, delay = 200) {
  let timer: any = null
  return function (...args: any[]) {
    if (timer)
      clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
      timer = null
    }, delay)
  }
}
