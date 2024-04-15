
export function debounce(fn:Function, delay:number){
    let timeoutId:number | null = null;
    return function(...args:any) {
        if(timeoutId!=null){
            clearTimeout(timeoutId);
        }
        
        timeoutId = window.setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    };
}
export function throttle(fn:Function, interval:number) {
    let lastCall = 0;
    return function (...args:any) {
        const now = new Date().getTime();
        if (now - lastCall < interval) {
            return;
        }
        lastCall = now;
        fn.apply(this, args);
    };
}