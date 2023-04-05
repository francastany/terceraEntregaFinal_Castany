
const renderOrderTable =  async() => {
    const orderTable = document.getElementById('tableOrder');
    // const orderTotal = document.getElementById('total');
    console.log(orderTable);
    let cart = await fetch('/api/carts', {method: 'GET'}).then(response => response.json());
    console.log(cart.products);
    orderTable.innerHTML = '';

    cart.products.forEach( product => {
        orderTable.innerHTML += `
                <tr>
                    <td>${product.title}</td>
                    <td>${product.price}</td>
                    <td>${product.quantity || 1}</td>
                    <td>${(product.quantity > 1) ? Number(product.quantity*product.price) : Number(product.price)}</td>
                </tr>
            `
    });

    // orderTotal.innerHTML = `$ ${cart.products.reduce()}` 
    
}

const renderHome = async() => {

    const response = await fetch('/api/products/all', {method: 'GET'}).then(response => response.json());
    let products = await response.totalProductos;

    products.forEach((prod, index) => {
        const prodId = prod._id;
        let addToCartBtn = document.getElementById(`addToCartBtn${index}`);
        addToCartBtn.addEventListener('click',async () => {

            await fetch(`/api/carts/addProduct/${prodId}`, {
                method: 'POST'
            });
            renderOrderTable();
            
        });
    });

    const finalizePurchase = document.querySelector('#finalizePurchase');
    if (finalizePurchase) {
        finalizePurchase.addEventListener('click', async () => {
            await fetch('/api/carts/confirmOrder', { method: 'POST' });
        });
    };

}
renderHome();
// renderOrderTable();