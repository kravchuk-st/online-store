import { listFiltersDefault } from '../../productList';
import {IFiltersList} from '../../productList';
import Products from '../items';
import { drawFilters }  from './drawFilters';
import { filterCatalog } from './filterCatalog';
import './filter.css';

const products = new Products();

const filtersBlock = <HTMLDivElement>document.querySelector('.filters');
const filterInput = <HTMLInputElement>document.querySelector('#input');
const filterSelect = <HTMLSelectElement>document.querySelector('.filter-select');
const filtersReset = <HTMLButtonElement>document.querySelector('.reset-filters');
const settingsReset = <HTMLButtonElement>document.querySelector('.reset-settings');
let filters: IFiltersList = {};

if (localStorage.getItem('filters') !== null) {
  filters = JSON.parse(localStorage.getItem("filters") as string);
  drawFilters(filters);
  filterCatalog(filters);
} else {
  filters = JSON.parse(JSON.stringify(listFiltersDefault));
}

filtersBlock.addEventListener('click', (ev: Event) => {
  if ((ev.target as HTMLObjectElement).hasAttribute('data-filter')) {
    let filter = (ev.target as HTMLElement).dataset.filter;
    if ((ev.target as Element).classList.contains('filter-btn')) {
      (ev.target as Element).classList.toggle('filter-active');
      let index = (filters[`${filter}`] as Array<string>).indexOf(`${(ev.target as HTMLElement).innerText}`);
      if (index === -1) {
        (filters[`${filter}`] as Array<string>).push((ev.target as HTMLElement).innerText);
      } else {
        (filters[`${filter}`] as Array<string>).splice(+`${index}`, 1)
      }
    }
    if ((ev.target as Element).classList.contains('filter-check')) {
      (filters[`${filter}`] as boolean) = (ev.target as HTMLInputElement).checked;
    }
    if (filter === 'clear') {
      filterInput.value = '';
      filterInput.focus();
      filters.name = '';
    }

    localStorage.setItem('filters', JSON.stringify(filters));
    filterCatalog(filters);
  }
  
});

filterInput.addEventListener('input', (ev: Event) => {
  filters.name = (ev.target as HTMLInputElement).value;
  localStorage.setItem('filters', JSON.stringify(filters));
  filterCatalog(filters);
});

filterSelect.addEventListener("change", (ev: Event) => {
  filters.sorting = (ev.target as HTMLSelectElement).value;
  localStorage.setItem('filters', JSON.stringify(filters));
  filterCatalog(filters);
});

filtersReset.addEventListener('click', () => {
  filters = JSON.parse(JSON.stringify(listFiltersDefault));
  localStorage.setItem('filters', JSON.stringify(listFiltersDefault));
  drawFilters(filters);
  filterCatalog(filters);
});

settingsReset.addEventListener('click', () => {
  localStorage.clear();
  location.reload();
});

function rangeInputChangeEventHandler(e:Event):void {
  let target = e.target as HTMLInputElement;
    
  const parent = target.parentElement;
  const minBtn = parent?.children[0] as HTMLInputElement;
  const maxBtn = parent?.children[1] as HTMLInputElement;
  const range_min = parent?.children[2] as HTMLSpanElement;
  const range_max = parent?.children[3] as HTMLSpanElement;
 
  const rangeName = target.getAttribute('name');  

  let minVal = +minBtn.value;
  let maxVal = +maxBtn.value;

  const origin = target.classList;
  
  if(origin.contains('min') && minVal > maxVal - 1){      
      minBtn.value = `${maxVal - 1}`;
  }
  minVal = +minBtn.value;
  
  if(origin.contains('max') && maxVal - 1 < minVal){
      maxBtn.value = `${minVal + 1}`;
  }
  maxVal = +maxBtn.value;
  
  if(rangeName === "range_3"){
    range_min.innerText = `${minVal}`;
    (filters.year as string[])[0] = `${minVal}`;
  }else if(rangeName === "range_4"){
    range_max.innerText = `${maxVal}`;
    (filters.year as string[])[1] = `${maxVal}`;
  }else if(rangeName === "range_2"){
    range_max.innerText = `${maxVal}`;
    (filters.amount as string[])[1] = `${maxVal}`;
  }else  if(rangeName === "range_1"){
    range_min.innerText = `${minVal}`;
    (filters.amount as string[])[0] = `${minVal}`;
  }

  let inputLength = +target.max - +target.min;
  let inputLeftVal = (minVal - +target.min) / inputLength * 100;
  let inputRightVal = (maxVal - +target.min) / inputLength * 100;
  Array.from((target.parentElement as HTMLElement).children as HTMLCollection).forEach((el) => {
    if (el.classList.contains('input-range')) {
      (el as HTMLInputElement).style.background = `linear-gradient(to right, white 0%, white ${inputLeftVal}%, #003d7c ${inputLeftVal}%, #003d7c ${inputRightVal}%, white ${inputRightVal}%, white 100%)`;
    }
  });

  localStorage.setItem('filters', JSON.stringify(filters));
  filterCatalog(filters);
}

document.querySelectorAll('input[type="range"]')[0].addEventListener('input', rangeInputChangeEventHandler);
document.querySelectorAll('input[type="range"]')[1].addEventListener('input', rangeInputChangeEventHandler);
document.querySelectorAll('input[type="range"]')[2].addEventListener('input', rangeInputChangeEventHandler);
document.querySelectorAll('input[type="range"]')[3].addEventListener('input', rangeInputChangeEventHandler);

