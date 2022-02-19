//imports
const express = require('express');
const cors = require('cors');
const session = require('express-session');
require('./config');


//inits
const app = express();


//middlewares
app.use(express.json());
app.use(cors(
    {
        origin:"*"
    }
));

app.use(session({
    secret: 'shh',
    cookie: {
        maxAge: 1000 * 60 * 60
    }
}));

//routes
app.use('/api/users',require('./controllers/usersController'))
app.use('/api/statics',require('./controllers/staticsController'))
app.use('/api/orders',require('./controllers/ordersController'))
app.use('/api/products',require('./controllers/productsController'))
app.use('/api/carts',require('./controllers/cartsController'))
app.use('/api/categories',require('./controllers/categoriesController'))

app.listen(1000, () => console.log('your on air'));
