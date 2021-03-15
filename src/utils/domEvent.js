
// 在函数内部判断参数
const addEvent = function(ele, event, fn) {
  if (ele.addEventLister) {
    ele.addEventLister(event, fn, false);
  } else {
    ele['on' + event] = fn;
  }
};

const removeEvent = function(ele, event, fn) {
  if (ele.removeEventLister) {
    ele.removeEventLister(event, fn, false);
  } else {
    ele['on' + event] = null;
  }
};

export {
  addEvent,
  removeEvent
};
