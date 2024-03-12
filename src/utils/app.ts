export function debounce<T>(fun: T, delay: number = 200) {
    return function (...args: any) {
      // 获取函数的作用域和变量
      const that = this
      // 每次事件被触发，都会清除当前的timeer，然后重写设置超时调用
      clearTimeout(fun.id)
      fun.id = setTimeout(function () {
        fun.call(that, ...args)
      }, delay)
    }
  }
  