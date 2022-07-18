import {IFiltersList} from '../../productList';

const filterBtns = Array.from(document.querySelectorAll<HTMLElement>('.filter-btn'));
const filterCheck = <HTMLInputElement>document.querySelector('.filter-check');
const filterInput = <HTMLInputElement>document.querySelector('#input');
const filterAmount = <HTMLElement>document.querySelector('#range-amount');
const filterYear = <HTMLElement>document.querySelector('#range-year');
const filterSelect = <HTMLSelectElement>document.querySelector('.filter-select');

export let drawFilters = function(filterList: IFiltersList) {
  filterBtns.forEach((el) => {
    el.classList.remove('filter-active');
    if ((filterList.mark as string[]).length > 0 && (filterList.mark as string[]).includes(el.innerText)) {
      el.classList.add('filter-active');
    } else if((filterList.color as string[]).length > 0 && (filterList.color as string[]).includes(el.innerText)) {
      el.classList.add('filter-active');
    } else if((filterList.amountOfCamera as string[]).length > 0 && (filterList.amountOfCamera as string[]).includes(el.innerText)) {
      el.classList.add('filter-active');
    }
  });
  if (filterList.isPopular) {
    filterCheck.checked = true;
  } else {
    filterCheck.checked = false;
  }

  filterInput.value = (filterList.name as string);

  Array.from(filterAmount.children).forEach((el: Element) => {
    if (el.classList.contains('input-range')) {
      (el as HTMLInputElement).style.background = `linear-gradient(to right, white 0%, white ${+(filterList.amount as string[])[0] * 5 / 2}%, #003d7c ${+(filterList.amount as string[])[0] * 5 / 2}%, #003d7c ${+(filterList.amount as string[])[1] * 5 / 2}%, white ${+(filterList.amount as string[])[1] * 5 / 2}%, white 100%)`;
    }
    if (el.classList.contains('min')) {
      (el as HTMLInputElement).value = (filterList.amount as string[])[0];
    }
    if (el.classList.contains('max')) {
      (el as HTMLInputElement).value = (filterList.amount as string[])[1];
    }
    if (el.classList.contains('range_min')) {
      (el as HTMLElement).innerText = (filterList.amount as string[])[0];
    }
    if (el.classList.contains('range_max')) {
      (el as HTMLElement).innerText = (filterList.amount as string[])[1];
    }
  });

  Array.from(filterYear.children).forEach((el: Element) => {
    if (el.classList.contains('input-range')) {
      (el as HTMLInputElement).style.background = `linear-gradient(to right, white 0%, white ${(+(filterList.year as string[])[0] -2010) * 100 / 12}%, #003d7c ${(+(filterList.year as string[])[0] - 2010) * 100 / 12}%, #003d7c ${(+(filterList.year as string[])[1] -2010) * 100 / 12}%, white ${(+(filterList.year as string[])[1] -2010) * 100 / 12}%, white 100%)`;
    }
    if (el.classList.contains('min')) {
      (el as HTMLInputElement).value = (filterList.year as string[])[0];
    }
    if (el.classList.contains('max')) {
      (el as HTMLInputElement).value = (filterList.year as string[])[1];
    }
    if (el.classList.contains('range_min')) {
      (el as HTMLElement).innerText = (filterList.year as string[])[0];
    }
    if (el.classList.contains('range_max')) {
      (el as HTMLElement).innerText = (filterList.year as string[])[1];
    }
  });
  
  Array.from(filterSelect.options).forEach(el => {
    if (el.value === `${filterList.sorting}`) el.selected = true;
  });
}
