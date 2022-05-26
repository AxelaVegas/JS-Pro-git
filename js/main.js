const products = [
    {id: 1, title: 'Notebook', price: 2000, img: 'https://picsum.photos/id/0/250/200'},
    {id: 2, title: 'Mouse', price: 20, img: 'https://picsum.photos/id/201/250/200'},
    {id: 3, title: 'Keyboard', price: 200, img: 'https://picsum.photos/id/366/250/200'},
    {id: 4, title: 'Gamepad', price: 50, img: 'https://picsum.photos/id/486/250/200'}
];
//Функция для формирования верстки каждого товара
//Добавить в выводе изображение
const renderProduct = (item) => {
    return `<div class="product-item">
                <h3>${item.title}</h3>
                <img src="${item.img}">
                <p>PRICE: ${item.price}</p>
                <button class="buy-btn">Купить</button>
            </div>`
};
const renderPage = list => {
    const productsList = list.map(item => renderProduct(item));
    console.log(productsList);
    /* Создал строчный элемент, в который переписал массив с разметкой. Запятой  больше нет */
    let strProdList = '';
    productsList.forEach(element => {
        strProdList += element;
    });
    document.querySelector('.products').innerHTML = strProdList;
};

renderPage(products);