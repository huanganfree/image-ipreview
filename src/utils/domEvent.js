
// 在函数内部判断参数
const addEvent = function(ele, event, fn) {
  if (!(ele && event && fn)) return;
  if (ele.addEventListener) {
    ele.addEventListener(event, fn);
  } else if (ele.attachEvent) {
    ele.attachEvent(event, fn);
  } else {
    ele['on' + event] = fn;
  }
};

const removeEvent = function(ele, event, fn) {
  if (!(ele && event && fn)) return;
  if (ele.removeEventListener) {
    ele.removeEventListener(event, fn);
  } else if (ele.detachEvent) {
    ele.detachEvent(event, fn);
  } else {
    ele['on' + event] = null;
  }
};

export {
  addEvent,
  removeEvent
};
