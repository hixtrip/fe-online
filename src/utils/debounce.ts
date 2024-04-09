import { ref } from 'vue';

// 定义防抖函数
const useDebounce = <T extends (...args: any[]) => void>(func: T, delay: number) => {
  // 创建一个计时器变量
  let timerId: ReturnType<typeof setTimeout> | null = null;

  // 创建一个响应式引用，用于保存最后一次触发的参数
  const lastArgs = ref<any[]>([]);

  // 创建一个函数，用于执行防抖逻辑
  const debouncedFunc = (...args: Parameters<T>) => {
    // 更新最后一次触发的参数
    lastArgs.value = args;

    // 清除之前的计时器
    if (timerId) {
      clearTimeout(timerId);
    }

    // 创建新的计时器，在 delay 毫秒后执行函数
    timerId = setTimeout(() => {
      // 调用原始函数，并传入最后一次触发的参数
      func(...lastArgs.value);
    }, delay);
  };

  // 返回防抖函数
  return debouncedFunc;
};

export default useDebounce;
