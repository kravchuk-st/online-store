import './items.css';
import {IProduct} from '../productList';
import LocalStorageUtil from './localStorageUtil/localStorageUtil';
import Cart from './cart/cart';

class Products {
  private localStorageUtil: LocalStorageUtil;
  private cart: Cart;
  private itemActive: string;
  private btnActive: string;
  private labelAdd: string;
  private labelDel: string;

  constructor() {
    this.localStorageUtil = new LocalStorageUtil();
    this.cart = new Cart();
    this.itemActive = 'item-active';
    this.btnActive = 'btn-active';
    this.labelAdd = 'Добавить в корзину';
    this.labelDel = 'Удалить из корзины';
  }

  draw(data: IProduct[]) {
    const productList = <HTMLDivElement>document.querySelector('.product-list');
    let productStore = this.localStorageUtil.getProducts();

    this.cart.view(`${productStore.length}`);

    data.forEach((item: IProduct) => {
      let itemClass = '';
      let btnClass = '';
      let btnText = '';

      if (productStore.indexOf(item.id) === -1) {
        btnText = this.labelAdd;
      } else {
        btnText = this.labelDel;
        itemClass = this.itemActive;
        btnClass = ' ' + this.btnActive;
      }
      const productItem = <HTMLDivElement>document.createElement("div");
      if (itemClass !== '') {
        productItem.classList.add('product-item', `${itemClass}`);
      } else {
        productItem.classList.add('product-item');
      }
      productItem.innerHTML = 
      `<div class="front">
        <img src="${item.src}" alt="${item.alt}">
        <h3>${item.name}</h3>
      </div>
      <div class="back">
        <h2>${item.name}</h2>
        <ul class="list list-reset">
            <li>Количество: ${item.amount}</li>
            <li>Год выхода: ${item.year}</li>
            <li>Производитель: ${item.mark}</li>
            <li>Цвет: ${item.color}</li>
            <li>Количество камер: ${item.amountOfCamera}</li>
        </ul>
        <button class="product-btn btn-reset${btnClass}" data-id='${item.id}'>${btnText}</button>
      </div>`
      productList.append(productItem);
    });
    
    this.cart.showModal(productStore);
  }

  setProductStorage() {
    const productList = <HTMLDivElement>document.querySelector('.product-list');
    productList.addEventListener('click', (ev: Event) => {
      if((ev.target as HTMLButtonElement).classList.contains('product-btn')) {
        const { pushProduct, products} = this.localStorageUtil.putProducts(`${(ev.target as HTMLButtonElement).dataset.id}`);
        if(pushProduct) {
          (ev.target as HTMLButtonElement).innerText = this.labelDel;
          (ev.target as HTMLButtonElement).classList.add('btn-active');
          ((ev.target as HTMLButtonElement).closest('.product-item') as HTMLDivElement).classList.add('item-active');
        } else {
          (ev.target as HTMLButtonElement).innerText = this.labelAdd;
          (ev.target as HTMLButtonElement).classList.remove('btn-active');
          ((ev.target as HTMLButtonElement).closest('.product-item') as HTMLDivElement).classList.remove('item-active');
        }
        this.cart.view(`${products.length}`);
        this.cart.showModal(products);
      }
    });
  }
}

export default Products;