function debounce(func:Function, wait:number) {  
  let timeout:any;  
  return function() {  
    const context = this;  
    const args = arguments;  
    if (timeout) clearTimeout(timeout);  
    timeout = setTimeout(function() {  
      func.apply(context, args);  
    }, wait);  
  };  
}  

export default debounce