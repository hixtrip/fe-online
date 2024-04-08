export default function debounce(fn: Function, time = 500, immediate: boolean) {
    let timer: number | null = null;
    let callNow = true;
    return function(...args: any[]) {
        const context = this;
        const arg = args;
        if(timer) clearInterval(timer);
        if(immediate && callNow) {
            callNow = false;
            timer = setTimeout(()=>{
                timer = null;
            }, time);
            if(!callNow) fn.apply(context, arg);
        } else {
            timer = setTimeout(()=>{
                fn.apply(context, arg);
            }, time);
        }
    }
}