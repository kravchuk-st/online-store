class LocalStorageUtil {
  private keyName: string;

  constructor() {
    this.keyName = 'products';
  }

  getProducts() {
    let products = localStorage.getItem(this.keyName);
    if (products !== null) {
      return JSON.parse(products);
    }
    return [];
  }

  putProducts(id: string | undefined) {
    let products = this.getProducts();
    let pushProduct = false;
    let index = products.indexOf(id);
    let productsLength = products.length;

    if (index === -1) {
      if (productsLength < 20) {
        products.push(id);
        pushProduct = true;
      } else {
        pushProduct = false;
        alert('Корзина заполнена!');
      }
    } else {
      products.splice(index, 1);
      pushProduct = false;
    }

    localStorage.setItem(this.keyName, JSON.stringify(products));

    return { pushProduct, products, };
  }
}

export default LocalStorageUtil;