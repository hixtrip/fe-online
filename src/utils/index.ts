// 防抖函数。 真实项目中建议使用 lodash-es 或者 ahooks 里的
export const debounce = (func: Function, delay: number) => {
  let timer: number | undefined
  return function (...args: any[]) {
    clearTimeout(timer)

    timer = setTimeout(() => {
      func(...args)
    }, delay)
  }
}
