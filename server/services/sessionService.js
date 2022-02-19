
async function isAuthenticated(req) {
    return await req.session.user != undefined
}

async function getUser(req) {
    return await req.session.user;
}

function logout(req) {
    req.session.destroy()
}

module.exports.sessionService = { isAuthenticated, getUser, logout };