const express = require('express');
const app = express();
require("dotenv").config();
const cors = require('cors');
const brandsRoutes = require('./routes/brands');
const productsRoutes = require('./routes/products');
const usersRoutes = require('./routes/users');
const cartRoutes = require('./routes/carts');
const reviewsRoutes = require('./routes/reviews');

const PORT = process.env.PORT || 5050;

app.use(express.json());
app.use(express.static('public'));

app.use(cors());

app.use('/brands', brandsRoutes);
app.use('/products', productsRoutes);
app.use('/users', usersRoutes);
app.use('/carts', cartRoutes);
app.use("/reviews", reviewsRoutes);


app.listen(PORT, () => {
    console.log(`running at http://localhost:${PORT}`);
});