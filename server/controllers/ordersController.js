const router = require('express').Router();
const { ordersService } = require('./../services/ordersService');
const { sessionService } = require('./../services/sessionService');
const { Response } = require('../helpers/response');
const { authenticated } = require('../helpers/authenticated');

router.use(authenticated);

router.get('/', async (req, res) => {
    try {
        const user = sessionService.getUser(req)
        const orders = await ordersService.getOrderHistory(user.id);
        res.send(orders);
    } catch (err) {
        console.log(err);
    }
});

router.get('/last', async (req, res) => {
    try {
        const user = sessionService.getUser(req)
        const orders = await ordersService.getLastOrder(user.id);
        res.send(orders);
    } catch (err) {
        console.log(err);
    }
});

router.post('/availabledates', async (req, res) => {
    try {
        const { orderDate } = req.body;
        const available = await ordersService.getAvailableDates(orderDate);

        if (available.length >= 3) {
            return res.status(400).send({ err: true, msg: "Date not Available" });
        }

        res.status(201).send(new Response("Date Available", true));

    } catch (err) {
        res.status(500).send(err);
        console.log(err);
    }
});

router.post('/', async (req, res) => {
    try {
        const {  cartId, totalPrice, city, street, deliveryDate, orderDate, creditCard } = req.body;
        const user = sessionService.getUser(req)
        if (!totalPrice || !city || !street || !deliveryDate || !orderDate || !creditCard || !cartId) {
            return res.status(400).send({ err: true, msg: "Please Fill in all Fields" });
        }

        await ordersService.createNewOrder(user.id, cartId, totalPrice, city, street, deliveryDate, orderDate, creditCard);

        res.status(201).send(new Response("Order added Successfully", true));

    } catch (err) {
        res.status(500).send(err);
        console.log(err);
    }
});



module.exports = router;


