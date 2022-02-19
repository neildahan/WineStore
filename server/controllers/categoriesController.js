const router = require('express').Router();
const { myQuery } = require('../config');
const { Response } = require('../helpers/response');

router.get('/', async (req, res) => {
    try {
        const categories = await myQuery('SELECT * FROM category;');
        res.send(new Response ("categories", true, categories));

    } catch (err) {
        console.log(err);
    }
});


module.exports = router;