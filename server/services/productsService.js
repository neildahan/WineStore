const { myQuery } = require('../config');


async function searchProduct(searchTerm) {
    return await myQuery(`SELECT * FROM product WHERE name = '${searchTerm}';`);
}

async function createNewProduct(name, categoryId, price, imgUrl) {
    return await myQuery(`INSERT INTO product(name,categoryId,price,imgUrl) values("${name}","${categoryId}","${price}","${imgUrl}")`);
}

async function getProductById(id) {
    return await myQuery(`SELECT * FROM product WHERE id = '${id}';`);
}

async function editProduct(id,name, categoryId, price, imgUrl) {
    return await myQuery(`UPDATE product SET name = '${name}', categoryId = '${categoryId}', price = '${price}', imgUrl = '${imgUrl}' WHERE id ='${id}'`);
}

async function getProductsByCategory(categoryId) {
    return await myQuery(`SELECT * FROM product WHERE categoryId = '${categoryId}';`);
}

async function getAllProducts() {
    return await myQuery(`SELECT * FROM product`);
}

module.exports.productsService = { searchProduct, createNewProduct,getProductById,editProduct,getProductsByCategory,getAllProducts };


