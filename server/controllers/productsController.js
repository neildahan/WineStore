const router = require('express').Router();
const { myQuery } = require('../config');
const { productsService } = require('./../services/productsService');
const { Response } = require('../helpers/response');

router.post('/search', async (req, res) => {
    try {
        const { searchTerm } = req.body;
        const results = await productsService.searchProduct(searchTerm);

        res.send(results);

    } catch (err) {
        res.status(500).send(err);
        console.log(err);
    }
});

router.post('/', async (req, res) => {
    try {
        const { name, categoryId, price, imgUrl} = req.body;

        if (!name || !categoryId || !price || !imgUrl) {
            return res.status(400).send({ err: true, msg: "Please Fill in all Fields" });
        }

        await productsService.createNewProduct(name, categoryId, price, imgUrl);

        res.status(201).send(new Response("Product added Successfully", true));

    } catch (err) {
        res.status(500).send(err);
        console.log(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const results = await productsService.getProductById(id) ;
        res.send(results);

    } catch (err) {
        res.status(500).send(err);
        console.log(err);
    }
});

router.put('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const { name, categoryId, price, imgUrl} = req.body;
    if (!name || !categoryId || !price || !imgUrl) {
        return res.status(400).send({ err: true, msg: "Please Fill in all Fields" });
    }
    await productsService.editProduct(id,name,categoryId,price,imgUrl)
    res.send({ msg: "Product updated successfully" });
});

router.get('/category/:categoryId', async (req, res) => {
    try {
        const { categoryId } = req.params;
        const results = await productsService.getProductsByCategory(categoryId) ;
        res.send(new Response ("products",true,results));

    } catch (err) {
        res.status(500).send(err);
        console.log(err);
    }
});

router.get('/', async (req, res) => {
    try {
        const results = await productsService.getAllProducts() ;
        res.send(new Response ("products",true,results));

    } catch (err) {
        res.status(500).send(err);
        console.log(err);
    }
});




module.exports = router;