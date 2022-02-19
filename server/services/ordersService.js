const { myQuery } = require('../config');


async function getOrderHistory(userId) {
    return await myQuery(`SELECT * FROM orders WHERE userId = ${userId};`);
}
async function getLastOrder(userId) {
    return await myQuery(`SELECT * FROM orders WHERE ID = (SELECT MAX(ID) FROM orders WHERE userId = ${userId});`);
}
async function getAvailableDates(orderDate) {
    return await myQuery(`SELECT orderDate FROM orders WHERE orderDate = '${orderDate}';`);
}
async function createNewOrder(userId, cartId, totalPrice, city, street, deliveryDate, orderDate, creditCard) {
    return await myQuery(`INSERT INTO orders(userId,cartId,totalPrice,city,street,deliveryDate,orderDate,creditCard) values("${userId}","${cartId}","${totalPrice}","${city}","${street}","${deliveryDate}","${orderDate}","${creditCard}")`);
}
module.exports.ordersService = { getOrderHistory, getLastOrder, checkAvailableDates: getAvailableDates, createNewOrder };