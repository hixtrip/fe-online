// 函数防抖
// immediate - 是否首次执行
// 参数1：防抖节流函数，参数2：延迟，参数3：是否首次执行
const debounce = (func: any, delay = 30 , immediate = true) => {
    let timer: string | number | NodeJS.Timeout | undefined, callNow = immediate;
    return (...args: any) => {
        if (timer) clearTimeout(timer);
        if (callNow) {
            func(...args);
            callNow = false;
        }
        timer = setTimeout(() => {
            func(...args);
        }, delay)
    }
}

// 节流
function throttle (fn:any, delay = 300) {
    let timer: string | number | NodeJS.Timeout | null | undefined = null
    return function (...args:any) {
        if(timer == null){
            timer = setTimeout(() => {
                fn.call(...args)
                clearTimeout(timer)
                timer = null
            }, delay);
        }
    }
}

export { debounce ,throttle }


