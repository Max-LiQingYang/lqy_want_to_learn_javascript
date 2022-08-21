class EventUtils {
  addEvent(element, type, handler) {
    if (element.addEventListener) {
      element.addEventListener(type, handler, false);
    } else if (element.attachEvent) {
      element.attchEvent("on" + type, handler);
    } else {
      element["on" + type] = handler;
    }
  }

  removeEvent(element, type, handler) {
    if (element.removeEventListener) {
      element.removeEventListener(type, handler, false);
    } else if (element.detachEvent) {
      element.detachEvent("on" + type, handler);
    } else {
      element["on" + type] = null;
    }
  }

  getEvent(event) {
    return event || window.event;
  }

  getTarget(event) {
    return event.target || event.srcElement;
  }

  stopPropogation(event) {
    if (event.stopPropogation) {
      event.stopPropagation();
    } else {
      event.cancelBubble = true;
    }
  }

  preventDefault(event) {
    if (event.preventDefault) {
      event.preventDefault();
    } else {
      event.returnValue = false;
    }
  }
}