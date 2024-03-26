const express = require('express');
const app = express();
require("dotenv").config();
const cors = require('cors');
const brandsRoutes = require('./routes/brands');
const productsRoutes = require('./routes/products');

const PORT = process.env.PORT || 5050;

app.use(express.json());

app.use(cors());

app.use('/brands', brandsRoutes);
app.use('/products', productsRoutes);
// app.get('/', (req, res) => {
//     res.send('Welcome to my API');
// });

app.listen(PORT, () => {
    console.log(`running at http://localhost:${PORT}`);
});