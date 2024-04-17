import { ref, onUnmounted } from 'vue'

export function useDebounced<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): T {
  const clearTimer = ref<NodeJS.Timeout | null>(null)

  const debouncedFn = (...args: Parameters<T>): void => {
    clearTimer.value && clearTimeout(clearTimer.value)
    clearTimer.value = setTimeout(() => {
      fn(...args)
    }, delay)
  }

  onUnmounted(() => {
    clearTimer.value && clearTimeout(clearTimer.value)
  })

  return debouncedFn as T
}
