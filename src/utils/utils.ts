// 防抖
let timer: any = null;
export const debounce = (fn: any, params = {}, delay = 500) => {
    clearTimeout(timer);

    // 重新设置事件触发的定时器
    timer = setTimeout(() => {
        fn(params);
        timer = null; // 当事件真正执行后，清空定时器
    }, delay);
};

//节流
let lastTime: any = Date.now();
export const throttle = (fn: any, delay = 500) => {
    const currentTime = Date.now();

    if (currentTime - lastTime >= delay) {
        fn();
        lastTime = currentTime;
    }
}
