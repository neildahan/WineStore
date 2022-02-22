const router = require('express').Router();
const { ordersService } = require('./../services/ordersService');
const { sessionService } = require('./../services/sessionService');
const { Response } = require('../helpers/response');
const { authenticated } = require('../helpers/authenticated');

// router.use(authenticated);

router.get('/', async (req, res) => {
    try {
        // const user = sessionService.getUser(req)
        const user = req.session.user
        console.log("check" + user.id)
        console.log("check2222" + sessionService.getUser(req))
        const orders = await ordersService.getOrderHistory(user.id);
        res.send(orders);
    } catch (err) {
        console.log(err);
    }
});

router.get('/last', async (req, res) => {
    try {
        const user = req.session.user
        console.log("222232323LLLL" + user.id)
         console.log("this is shit" + sessionService.getUser(req).id)
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
        const {  userId, cartId, totalPrice, city, street, deliveryDate, creditCard } = req.body;
        // const user = sessionService.getUser(req)
        console.log(req.body)
        if (!totalPrice || !city || !street || !deliveryDate || !creditCard || !cartId) {
            return res.status(400).send({ err: true, msg: "Please Fill in all Fields" });
        }


        const orderDate = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`;
        await ordersService.createNewOrder(userId, cartId, totalPrice, city, street, deliveryDate, orderDate, creditCard);

        res.status(201).send(new Response("Order added Successfully", true));

    } catch (err) {
        res.status(500).send(err);
        console.log(err);
    }
});



module.exports = router;


