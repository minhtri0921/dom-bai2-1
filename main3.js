const PRODUCTS = [
    { category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football' },
    { category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball' },
    { category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball' },
    { category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch' },
    { category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5' },
    { category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7' }
];
let headerHTML = `<tr>
<th> Name </th>
<th>Price</th
</tr>`
function renderProduct(product) {
    return `<tr>
    <td>${product.name}</td>
    <td>${product.price}</td>
   </tr>`
}
function renderProductStockedFalse(product) {
    return `<tr>
   <td style="color:red;">${product.name}</td>
   <td  style="color:red;">${product.price}</td>
   </tr>`
}
let bodyHTML = ''
function renderProducts(PRODUCTS) {
    let electronicsProducts = PRODUCTS.filter(prd => prd.category === "Electronics")
    let sportingGoodsProducts = PRODUCTS.filter(prd => prd.category === "Sporting Goods")
    bodyHTML += `<tr><td colspan="2" style="text-align:center;">Sporting Good</td></tr>`
    for (let i = 0; i < sportingGoodsProducts.length; i++) {
        if (sportingGoodsProducts[i].stocked === false) {
            bodyHTML += renderProductStockedFalse(sportingGoodsProducts[i])
        } else {
            bodyHTML += renderProduct(sportingGoodsProducts[i])
        }
    }
    bodyHTML += `<tr><td colspan="2" style="text-align:center;">Electronic</td></tr>`
    for (let i = 0; i < electronicsProducts.length; i++) {
        if (electronicsProducts[i].stocked === false) {
            bodyHTML += renderProductStockedFalse(electronicsProducts[i])
        } else {
            bodyHTML += renderProduct(electronicsProducts[i])
        }
    }
    let tableElement = document.querySelector('table');
    tableElement.innerHTML = headerHTML + bodyHTML
}
renderProducts(PRODUCTS)


let checkElement = document.getElementById('check')
let isChecked = false
let productStockTrue ; 
checkElement.onclick = function () {
    productStockTrue = PRODUCTS.filter(product => product.stocked === true);
    bodyHTML = '';
    if (this.checked) {
        renderProducts(productStockTrue);
        isChecked = true;
    } else {
        renderProducts(PRODUCTS)
    }
};

let inputElement = document.getElementById('find')
let value = ''
let productFind = []
inputElement.oninput = function () {
    value = inputElement.value
    if (isChecked === true) {
        productFind = productStockTrue.filter(product => product.name.includes(value))
        bodyHTML = ''
        renderProducts(productFind)
    }else{
        productFind = PRODUCTS.filter(product => product.name.includes(value))
        bodyHTML = ''
        renderProducts(productFind)
    }
}
