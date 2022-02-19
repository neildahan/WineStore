const router = require('express').Router();
const { myQuery } = require('../config');
const { Response } = require('../helpers/response');

router.get('/', async (req, res) => {
    try {
        const ordersNum = await myQuery('SELECT COUNT(*) AS submittedOrders FROM orders;');
        const productsNum = await myQuery('SELECT COUNT(*) AS avalibleProducts FROM product;');
        console.log(productsNum)

        if (!ordersNum || !productsNum) {
            return res.status(500)
        }

        const data = {
            ...productsNum[0],
            ...ordersNum[0]
        }

        res.send(new Response ("statics",true,data));

    } catch (err) {
        console.log(err);
    }
});


module.exports = router;