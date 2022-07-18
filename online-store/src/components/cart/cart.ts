import LocalStorageUtil from '../localStorageUtil/localStorageUtil';
import {IProduct} from '../../productList';
import { catalog } from '../../productList';
import './cart.css'

class Cart{
  private localStorageUtil: LocalStorageUtil;
  private cartBtn: HTMLButtonElement;
  private closeCartBtn: HTMLButtonElement;
  private modalOverlay: HTMLElement;
  private modal: HTMLElement;

  constructor() {
    this.localStorageUtil = new LocalStorageUtil();
    this.cartBtn = document.querySelector('.basket') as HTMLButtonElement;
    this.closeCartBtn = document.querySelector('.modal__close') as HTMLButtonElement;
    this.modalOverlay = document.querySelector('.modal-overlay') as HTMLElement;
    this.modal = document.querySelector('.modal__container') as HTMLElement;
  }

  view(count: number | string) {
    const cartBtn = document.querySelector('.basket__count') as HTMLButtonElement;
    if(+count > 0) {
      cartBtn.innerText = `${count}`;
      cartBtn.classList.add('basket__count_active');
    } else {
      cartBtn.innerText = '';
      cartBtn.classList.remove('basket__count_active');
    }
  }

  showModal(data: string[], infoMessage = false) {
    const modalTable = document.querySelector('.modal__table') as HTMLTableElement;
    const modalContent = document.querySelector('.modal__content') as HTMLDivElement;
    const modalText = document.querySelector('.modal__text') as HTMLDivElement;
    modalTable.innerHTML = '';
    modalText.innerHTML = '';

    this.cartBtn.addEventListener('click', () => {   
      this.modal.classList.add('modal--visible');
      this.modalOverlay.classList.add('modal-overlay--visible');
    });

    this.modalOverlay.addEventListener('click', (ev: Event) => {      
      if (ev.target == this.modalOverlay) {
        this.modalOverlay.classList.remove('modal-overlay--visible');
        this.modal.classList.remove('modal--visible');
      }
    });

    this.closeCartBtn.addEventListener('click', () => {   
      this.modalOverlay.classList.remove('modal-overlay--visible');
      this.modal.classList.remove('modal--visible');
    });

    if (data.length === 0) {
      modalText.innerHTML = `<h2>Корзина пуста</h2>
      <p>Но это никогда не поздно исправить :)</p>`;
      modalContent.append(modalText);
    } else if(infoMessage) {
      modalText.innerHTML = `<h2>Извините, все слоты заполнены :(</h2>`;
      modalContent.append(modalText);
    } else {
      let productNumber = 1;

      catalog.forEach((item: IProduct) => {
        if (data.includes(`${item.id}`)) {
          let productTr = <HTMLTableRowElement>document.createElement("tr");
          productTr.innerHTML = 
          `<td>${productNumber++}</td>
          <td><img class="modal__img" src="${item.src}" alt="..."></td>
          <td>${item.name}</td>
          <td>${item.price.toLocaleString()} USD</td>`

          modalTable?.append(productTr);
        }
      });
    }
  }
}

export default Cart;