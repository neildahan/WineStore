const { myQuery } = require('../config');

async function getActiveCart(userId) {
    const cart = await myQuery(`SELECT * FROM cart WHERE userId = ${userId} AND isActive = TRUE`);
    cart[0].products = await getCartItems(cart[0].id);
    return cart[0];
}

async function getCartItems(cartId) {
    return await myQuery(`
    SELECT cartItem.id,product.name,product.id as "productId",product.imgUrl,product.price,cartItem.quantity,cartItem.totalPrice
    FROM cartItem
    INNER JOIN product
    ON cartItem.productId = product.id
    WHERE cartId = "${cartId}"
    `);
}

async function addCartItem( productId, quantity, cartId, productPrice ) {
    let totalPrice = productPrice * quantity;
    return await myQuery(`
    INSERT INTO cartItem(productId,quantity,totalPrice,cartId) 
    values("${productId}","${quantity}","${totalPrice}","${cartId}")
    `);
}

async function updateCartItemQuantity( quantity, cartItemId, productPrice ) {
    let totalPrice = productPrice * quantity;
    return await myQuery(`
    UPDATE cartItem SET quantity = "${quantity}", totalPrice = "${totalPrice}"
    WHERE id = "${cartItemId}"
    `);
}

async function deleteCartItem( cartItemId ) {
    return await myQuery(`
    DELETE FROM cartItem
    WHERE id = "${cartItemId}"
    `);
}
async function deleteCartItems( cartId ) {
    return await myQuery(`
    DELETE FROM cartItem
    WHERE cartId = "${cartId}"
    `);
}

module.exports.cartsService = { getActiveCart, getCartItems, addCartItem, updateCartItemQuantity, deleteCartItem,deleteCartItems };