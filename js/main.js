const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

// let getRequest = (url, cb) => {
//     let xhr = new XMLHttpRequest();
//     // window.ActiveXObject -> xhr = new ActiveXObject()
//     xhr.open("GET", url, true);
//     xhr.onreadystatechange = () => {
//         if(xhr.readyState === 4){
//             if(xhr.status !== 200){
//                 console.log('Error');
//             } else {
//                 cb(xhr.responseText);
//             }
//         }
//     };
//     xhr.send();
// };

class ProductsList {
    constructor(container = '.products'){
        this.container = container;
        this.goods = [];//массив товаров из JSON документа
        this._getProducts()
            .then(data => { //data - объект js
                 this.goods = data;
//                 console.log(data);
                 this.render()
            });
    }
    // _fetchProducts(cb){
    //     getRequest(`${API}/catalogData.json`, (data) => {
    //         this.goods = JSON.parse(data);
    //         console.log(this.goods);
    //         cb();
    //     })
    // }
    _getProducts(){
      
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            });
       
    }
    calcSum(){
        return this.allProducts.reduce((accum, item) => accum += item.price, 0);
    }
    render(){
        const block = document.querySelector(this.container);
        for (let product of this.goods){
            const productObj = new ProductItem(product);
//            this.allProducts.push(productObj);
            block.insertAdjacentHTML('beforeend', productObj.render());
        }

    }
}


class ProductItem {
    constructor(product, img = 'https://via.placeholder.com/200x150'){
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.img = img;
    }
    render(){
        return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price} $</p>
                    <button class="buy-btn">Купить</button>
                </div>
            </div>`
    }
}


/* class CartList {
    constructor(container = 'cart'){
        this.container = container;
        this.cart = [];//массив товаров из JSON документа
        this._getCart()
            .then(data => { //data - объект js
                 this.cart = data.contents;
//                 console.log(data);
                 this.render()
            });
    }

    _getCart(){
      
        return fetch(`${API}/getBasket.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            });
       
    }

    render(){
        const block = document.getElementById(this.container);
        for (let item of this.cart){
            const cartObj = new CartItem(item);
            block.insertAdjacentHTML('beforeend', cartObj.render());
        }
    }
}

class CartItem {
    constructor(item){
        this.title = item.product_name;
        this.price = item.price;
        this.id = item.id_product;
        this.quantity = item.quantity;
    }
    render(){
        return `<div>id#<b>${this.id}</b> наименование <b>${this.title}</b> количество <b>${this.quantity}</b> 
                цена <b>${this.price}</b></div> <hr>`
    }
} */

class CartList {
    constructor(container = 'cart'){
        this.container = container;
        this.cart = [];//массив товаров из JSON документа
        this._getCart()
            .then(data => { //data - объект js
                 this.cart = data;
//                 console.log(data);
                 this.render()
            });
    }

    _getCart(){
      
        return fetch(`${API}/getBasket.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            });
       
    }

    render(){
        const block = document.getElementById(this.container);
        for (let item of this.cart.contents){
            const cartObj = new CartItem(item);
            block.insertAdjacentHTML('beforeend', cartObj.render());
        }
        const cartResult = new CartResult(this.cart);
        block.insertAdjacentHTML('beforeend', cartResult.render());
    }
}

class CartItem {
    constructor(item){
        this.title = item.product_name;
        this.price = item.price;
        this.id = item.id_product;
        this.quantity = item.quantity;
    }
    render(){
        return `<div>id#<b>${this.id}</b> наименование <b>${this.title}</b> количество <b>${this.quantity}</b> 
                цена <b>${this.price}</b></div> <hr>`
    }
}

class CartResult {
    constructor(allCart){
        this.amount = allCart.amount;
        this.countGoods = allCart.countGoods;
    }
    render(){
        return `<div>Всего товаров: <b>${this.countGoods}</b><br> На сумму: <b>${this.amount}</b></div>`
    }
}

let list = new ProductsList();
console.log(list.allProducts);

let cartList = new CartList();
console.log(cartList);

