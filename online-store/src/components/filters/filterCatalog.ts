import {IProduct} from '../../productList';
import {IFiltersList} from '../../productList';
import { catalog } from '../../productList';
import Products from '../items';

const products = new Products();

const productList = <HTMLDivElement>document.querySelector('.product-list');

export let filterCatalog = function(filtersList: IFiltersList): void {
  let newProducts = catalog.filter((el) => {
    let filterMark = true;
    
    if ((filtersList.mark as string[]).length === 0) {
      filterMark = true;
    } else if ((filtersList.mark as string[]).length > 0 && (filtersList.mark as string[]).includes(`${el.mark}`)) {
      filterMark = true;
    } else {
      filterMark = false;
    }
    
    let filterColor = true;

    if ((filtersList.color as string[]).length === 0) {
      filterColor = true;
    } else if ((filtersList.color as string[]).length > 0 && (filtersList.color as string[]).includes(`${el.color}`)) {
      filterColor = true;
    } else {
      filterColor = false;
    }

    let filterCamera = true;

    if ((filtersList.amountOfCamera as string[]).length === 0) {
      filterCamera = true;
    } else if ((filtersList.amountOfCamera as string[]).length > 0 && (filtersList.amountOfCamera as string[]).includes(`${el.amountOfCamera}`)) {
      filterCamera = true;
    } else {
      filterCamera = false;
    }

    let filterPopular = true;

    if (filtersList.isPopular === false) {
      filterPopular = true;
    } else if (filtersList.isPopular === true && `${el.isPopular}` === 'true') {
      filterPopular = true;
    } else {
      filterPopular = false;
    }

    let filterAmount = true;

    if ((+`${el.amount}`) >= +(filtersList.amount as string[])[0] && (+`${el.amount}`) <= +(filtersList.amount as string[])[1]) {
      filterAmount = true;
    } else {
      filterAmount = false;
    }

    let filterYear = true;

    if ((+`${el.year}`) >= +(filtersList.year as string[])[0] && (+`${el.year}`) <= +(filtersList.year as string[])[1]) {
      filterYear = true;
    } else {
      filterYear = false;
    }

    let filterInputText = true;

    if ((filtersList.name as string).length === 0) {
      filterInputText = true;
    } else if ((filtersList.name as string).length > 0 && ((`${el.name}`).toLowerCase().includes((filtersList.name as string).toLowerCase()) || (`${el.mark}`).toLowerCase().includes((filtersList.name as string).toLowerCase()))) {
      filterInputText = true;
    } else {
      filterInputText = false;
    }

    return filterMark && filterColor && filterCamera && filterInputText && filterPopular && filterAmount && filterYear
  });

  productList.innerHTML = '';

  if (newProducts.length === 0) {
    productList.innerHTML = `<h2>Извините совпадений не найдено</h2>`;
  } else {
    const newProductsSort = JSON.parse(JSON.stringify(newProducts));

    switch(filtersList.sorting) {
      case 'textUp':
        newProductsSort.sort((a: IProduct, b: IProduct) => a.name > b.name ? 1 : -1);
        break;
      case "textDown":
        newProductsSort.sort((a: IProduct, b: IProduct) => b.name > a.name ? 1 : -1);
        break;
      case "yearUp":
        newProductsSort.sort((a: IProduct, b: IProduct) => +a.year - +b.year);
        break;
      case "yearDown":
        newProductsSort.sort((a: IProduct, b: IProduct) => +b.year - +a.year);
        break;
      default:
        console.log('Error')
    }
    products.draw(newProductsSort);
  }
}