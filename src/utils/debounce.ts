export default function debounce<T>(func: (T: T) => any, time = 200) {
  let timerId: any = null;
  return (t: T) => {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      func(t);
    }, time);
  };
}
