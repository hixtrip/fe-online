import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * @description 防抖 hooks
 * @param callback 回调
 * @param delay    延迟时间
 */
export function useDebounce(callback: Function, delay = 500) {
    // 使用ref存储定时器ID，ref在组件的整个生命周期内保持不变
    const timerId = useRef();

    // 清除定时器的函数
    useEffect(() => {
        return () => {
            if (timerId.current) {
                clearTimeout(timerId.current);
            }
        };
    }, []);

    // 防抖函数
    const debouncedCallback = (...args: any[]) => {
        if (timerId.current) {
            clearTimeout(timerId.current);
        }
        timerId.current = setTimeout(() => {
            callback(...args);
        }, delay);
    };

    return debouncedCallback;
}
