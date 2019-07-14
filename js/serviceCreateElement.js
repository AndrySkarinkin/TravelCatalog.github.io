class ServiceCreateElement{

  getElement(options) {
    let element = document.createElement(options.tagName);
    element.setAttribute('class', options.className);
    if ('innerText' in options) {
      element.innerText = options.innerText;
    }

    if ('imgSrc' in options) {
      element.src = options.imgSrc;
    }

    if ('id' in options) {
      element.setAttribute('data-id', options.id);
    }

    return element;
  }
}

let serviceCreateElement = new ServiceCreateElement();


