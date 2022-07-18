import { catalog } from './productList';
import Products from './components/items';
import { filterCatalog } from './components/filters/filterCatalog';
import './components/filters/index';
import './global.css';

const products = new Products();

products.draw(catalog);

products.setProductStorage();

if (localStorage.getItem('filters') !== null) {
  let filters = JSON.parse(localStorage.getItem("filters") as string);
  filterCatalog(filters);
}
