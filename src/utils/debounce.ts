function debounce(send, time) {
    let name;
    return function (...args) {
        if (name) clearTimeout(name)
        name = setTimeout(function () {
            send(...args)
        }, time);
    }
}
export default debounce