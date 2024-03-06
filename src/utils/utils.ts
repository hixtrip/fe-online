/*
 * @Author: KokoTa
 * @Date: 2024-03-06 19:32:40
 * @LastEditTime: 2024-03-06 19:56:47
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: \fe-online\src\utils\utils.ts
 */
export function throttle<T extends (...args: any[]) => any>(
  fn: T,
  wait: number = 300
) {
  let flag: boolean = true

  return function (this: any, ...args: Parameters<T>) {
    if (flag) {
      fn.apply(this, args)
      flag = false
      setTimeout(() => {
        flag = true
      }, wait)
    }
  }
}

export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  wait: number = 300
) {
  let timer: number | null = null

  return function (this: any, ...args: Parameters<T>) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, wait)
  }
}
