
const { myQuery } = require('../config');

async function login(email, password) {
    return await myQuery(`SELECT * from users WHERE email = '${email}' AND password = '${password}'`);
}
async function register(firstName, lastName, email, identification, password, city, street) {
    return await myQuery(`INSERT INTO users(firstName,lastName,email,identification,password,city, street) values("${firstName}","${lastName}","${email}","${identification}","${password}","${city}","${street}")`);
}

async function getUser(id) {
    return await myQuery(`SELECT * from users WHERE id = ${id}`);
}

module.exports.usersService = { login, register, getUser };