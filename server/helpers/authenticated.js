const { sessionService } = require('./../services/sessionService');

module.exports.authenticated = async (req, res, next) => {
    const isAuth = req.session.user
    console.log("####&&&&&@@@@@", isAuth);
    if (isAuth) {
        next();
    }
    else {
        res.status(401).send({ err: true, msg: "secure content. please log as in a user to access" });
    }
};