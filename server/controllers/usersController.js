const router = require('express').Router();
const { usersService } = require('./../services/usersService');
const { Response } = require('../helpers/response');

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send({ err: true, msg: "Missing Email or Password" });
        }

        let user = await usersService.login(email, password);
        if (!user.length) {
            return res.status(401).send({ err: true, msg: "Incorrect username or password" });
        }
        user = user[0];
        req.session.userId = user.id;
        req.session.user = {
            email,
            role: user.role,
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            identification: user.identification,
            city: user.city,
            street: user.street
        };

console.log(req.session.user.id )
        res.send(new Response("you logged in successfully", true, user));
    } catch (err) {
        res.status(500).send(err);
        console.log(err);
    }
});


router.post('/register', async (req, res) => {
    try {
        const { firstName, lastName, email, identification, password, city, street } = req.body;

        if (!firstName || !lastName || !email || !identification || !password || !city || !street) {
            return res.status(400).send({ err: true, msg: "Please Fill in all Fields" });
        }

        await usersService.register(firstName, lastName, email, identification, password, city, street);
    
        res.status(201).send(new Response("User added Successfully", true));

    } catch (err) {
        res.status(500).send(err);
        console.log(err);
    }
});

router.get('/loggedIn' ,async (req, res) => {
try {
    res.json(new Response ("User", true, req.session.user))
    console.log(req.session.user)
} catch (err) {
    res.status(400)
}

})

module.exports = router;




