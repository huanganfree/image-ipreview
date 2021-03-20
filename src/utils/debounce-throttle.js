export const throttle = function(func, delay) { // 节流
  let timer = null;
  return function() {
    const context = this;
    const args = arguments;
    if (timer) return;
    timer = setTimeout(() => {
      func.apply(context, args);
      timer = null;
    }, delay);
  };
};
