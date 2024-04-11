function debounce(func: Function): Function
function debounce(func: Function, delay: number = 200): Function {
  let timeout = null
  return function (this: any, ...args: any[]) {
    const context = this
    clearTimeout(timeout!)
    timeout = setTimeout(() => {
      func.apply(context, args)
    }, delay)
  }
}
export default debounce
