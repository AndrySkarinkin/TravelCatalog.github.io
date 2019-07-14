class ServiceTravel {
  constructor(container, counter, travelCatalog) {
    this.container = document.querySelector(container);
    this.counter = document.querySelector(counter);
    this.travelCatalog = travelCatalog;
    this.create();
  }

  /* <div class="item">
        <div class="item__title">
          Греция
        </div>
        <div class="item__img">
          <img src="img/greece.jpg" alt="">
        </div>
        <div class="item__price">
          900$
        </div>
        <button class="item__button">
          Добавить в корзину
        </button>
      </div> */
  create() {
    let wrapper = document.createElement('slot');
    let travels = serviceStore.getTravel();
    let count = travels.length;
    this.counter.innerText = count;

    let activeText, activeClass;
    for (let i = 0; i < this.travelCatalog.length; i++) {
      let index = travels.indexOf(this.travelCatalog[i].id);
      if (index === -1) {
        activeText = 'Add to cart';
        activeClass = '';
      } else {
        activeText = 'Remove from cart';
        activeClass = 'btn-active';
      }
      let item = serviceCreateElement.getElement({
        tagName: 'div',
        className: 'item'
      });
      let title = serviceCreateElement.getElement({
        tagName: 'div',
        className: 'item__title',
        innerText: this.travelCatalog[i].title
      });
      let imgWrap = serviceCreateElement.getElement({
        tagName: 'div',
        className: 'item__img'
      });
      let img = serviceCreateElement.getElement({
        tagName: 'img',
        imgSrc: this.travelCatalog[i].img
      });
      let price = serviceCreateElement.getElement({
        tagName: 'div',
        className: 'item__price',
        innerText: this.travelCatalog[i].price
      });
      let button = serviceCreateElement.getElement({
        tagName: 'button',
        className: 'item__button ' + activeClass,
        innerText: activeText,
        id: this.travelCatalog[i].id
      });

      button.addEventListener('click', function () {
        let id = this.getAttribute('data-id');
        let result = serviceStore.putTravel(id);
        serviceTravel.counter.innerText = result.travels.length;
        if (result.pushTravel === true) {
          this.innerText = 'Remove from cart';
          this.classList.add('btn-active');
        } else {
          this.innerText = 'Add to cart';
          this.classList.remove('btn-active');
        }
        
      });
      wrapper.appendChild(item);
      item.appendChild(title);
      item.appendChild(imgWrap);
      imgWrap.appendChild(img);
      item.appendChild(price);
      item.appendChild(button);
    }
    this.container.appendChild(wrapper);
  }
  actions() {
  }
}



let serviceTravel = new ServiceTravel('.container-shop', '.counter', travelCatalog);