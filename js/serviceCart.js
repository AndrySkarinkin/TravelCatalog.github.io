class ServiceCart {
  constructor(counter, containerCart, containerCartWrap, containerShop, total, travelCatalog) {
    this.counter = document.querySelector(counter);
    this.containerCart = document.querySelector(containerCart);
    this.containerCartWrap = document.querySelector(containerCartWrap);
    this.containerShop = document.querySelector(containerShop);
    this.total = document.querySelector(total);
    this.travelCatalog = travelCatalog;
    this.create();
  }
  create() {
    this.counter.addEventListener('click', () => {
      serviceCart.containerCartWrap.style.display = 'block';
      serviceCart.containerShop.style.display = 'none';
      let travelCart = serviceCart.getTravelCart();
      this.getTotal();
      let wrapper = document.createElement('slot');
      for (let i = 0; i < travelCart.length; i++) {
        let item = serviceCreateElement.getElement({
          tagName: 'div',
          className: 'item'
        });
        let itemTitle = serviceCreateElement.getElement({
          tagName: 'div',
          className: 'item__title',
          innerText: travelCart[i].title
        });
        let itemImg = serviceCreateElement.getElement({
          tagName: 'div',
          className: 'item__img'
        });
        let img = serviceCreateElement.getElement({
          tagName: 'img',
          imgSrc: travelCart[i].img
        });
        let price = serviceCreateElement.getElement({
          tagName: 'div',
          className: 'item__price',
          innerText: travelCart[i].price
        });
        /*   <div class="container-cart__close">
      <img class="container-cart__close" src="img/close.png" alt="">
    </div> */


        wrapper.appendChild(item);
        item.appendChild(itemTitle);
        item.appendChild(itemImg);
        itemImg.appendChild(img);
        item.appendChild(price);
      }
      this.containerCart.appendChild(wrapper);
      let closeWrap = serviceCreateElement.getElement({
        tagName: 'div',
        className: 'container-cart__close',
      });
      let closeImg = serviceCreateElement.getElement({
        tagName: 'img',
        className: 'container-cart__close',
        imgSrc: 'img/close.png'
      });
      closeWrap.appendChild(closeImg);
      this.containerCartWrap.appendChild(closeWrap);
      closeImg.addEventListener('click', () => {
        serviceCart.containerCartWrap.style.display = 'none';
        serviceCart.containerShop.style.display = 'block';
        serviceCart.containerCart.innerHTML = '';
      });
    });


  }

  getTravelCart() {
    let travels = serviceStore.getTravel();
    let travelsCart = [];
    for (let i = 0; i < this.travelCatalog.length; i++) {
      if (travels.indexOf(this.travelCatalog[i].id) != -1) {
        travelsCart.push(this.travelCatalog[i]);
      }
    }
    return travelsCart;
  }

  getTotal(){
    let travelCart = this.getTravelCart();
    let total = 0 ;
    for(let i = 0; i< travelCart.length; i++){
      let index = travelCart[i].price.indexOf('$');
      if(index != -1){
       total += +travelCart[i].price.substring(0, index);
      }
    }
    this.total.innerText = `${total} $`;
  }

}

let serviceCart = new ServiceCart('.cart-counter', '.container-cart', '.container-cart-wrap', '.container-shop-wrap', '.container-cart-total__cost', travelCatalog);