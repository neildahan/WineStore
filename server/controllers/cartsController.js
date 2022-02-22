const router = require('express').Router();
const { cartsService } = require('./../services/cartsService');
const { sessionService } = require('./../services/sessionService');
const { Response } = require('../helpers/response');
const { authenticated } = require('../helpers/authenticated');
const { usersService } = require('../services/usersService');

// router.use(authenticated);

router.get('/active/:userId', async (req, res) => {
    try {
        const user = await usersService.getUser(req.params.userId);
        const activeCart = await cartsService.getActiveCart(user[0].id);
        res.send(new Response ("cart", true, activeCart));
    } catch (err) {
        console.log(err);
    }
});


router.post('/additem', async (req, res) => {
    try {
        const { productId, quantity, cartId, totalPrice } = req.body;
        console.log(req.body)
        if (!productId || !quantity || !cartId || !totalPrice ) {
            return res.status(400).send({ err: true, msg: "Please Fill in all Fields" });
        }

        await cartsService.addCartItem(productId, quantity, cartId, totalPrice);

        res.status(201).send(new Response("Cart Item added Successfully", true));

    } catch (err) {
        res.status(500).send(err);
        console.log(err);
    }
});

router.put('/quantity', async (req, res) => {
    try {
        const { quantity, cartItemId, totalPrice } = req.body;
        if ( !quantity || !cartItemId || !totalPrice ) {
            return res.status(400).send({ err: true, msg: "Please Fill in all Fields" });
        }

        await cartsService.updateCartItemQuantity(quantity, cartItemId, totalPrice);

        res.status(201).send(new Response("Cart Item updated Successfully", true));

    } catch (err) {
        res.status(500).send(err);
        console.log(err);
    }
});

router.delete('/:cartItemId', async (req, res) => {
    try {
        const { cartItemId } = req.params;
        await cartsService.deleteCartItem(cartItemId);

        res.status(201).send(new Response("Cart Item deleted Successfully", true));

    } catch (err) {
        res.status(500).send(err);
        console.log(err);
    }
});

router.delete('/clear/:cartId', async (req, res) => {
    try {
        const { cartId } = req.params;
        await cartsService.deleteCartItems(cartId);

        res.status(201).send(new Response("Cart Items deleted Successfully", true));

    } catch (err) {
        res.status(500).send(err);
        console.log(err);
    }
});


module.exports = router;


