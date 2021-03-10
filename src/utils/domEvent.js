const addEvent = function(ele, event, fn) {
  ele['on' + event] = fn;
};

const removeEvent = function(ele, event) {
  ele['on' + event] = null;
};

export {
  addEvent,
  removeEvent
};
