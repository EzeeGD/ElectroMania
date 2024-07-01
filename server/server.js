// ! Dependencies
const fs = require('fs')
const cors = require('cors');
const path = require('path');
const express = require('express');
const { MercadoPagoConfig, Preference } = require('mercadopago');

// * Constants
const PRODUCTS_PATH = './data/products.json';

const app = express();
const port = process.env.PORT || 8082;
const client = new MercadoPagoConfig({
    accessToken: 'TEST-2311629547680354-112817-8128103c9c858a63c3dc5b58dba35a3f-223221824'
});

// * Middleware

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client')));
app.use(cors());

// * Routes

app.get("/", function(req, res) {
    const filePath = path.resolve(__dirname, '..', 'client', 'index.html');
    res.sendFile(filePath);
});

app.get('/api/products', function(req, res) {
    try {
        const data = fs.readFileSync(PRODUCTS_PATH, 'utf8');
        const products = JSON.parse(data);

        res.    json(products);
    } catch (error) {
        console.error("Error obtaining products:", error);
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
});


app.get('/api/feedback', function(req, res) {
    res.json({
        Payment: req.query.payment_id,
        Status: req.query.status,
        MerchantOrder: req.query.merchant_order_id
    });
});

app.post("/api/create_preference", async (req, res) => {
    const preference = new Preference(client);

    console.debug(req.body)

    try {
        const response = await preference.create({
            body: req.body
        });

        console.info("Successfully created preference.")
        res.json({
            id: response.id,
        });
    } catch (error) {
        console.error("Error creating preference:", error);
        res.status(500).json({
            error: "Internal Server Error",
        });
    }
});

app.listen(port, () => {
    console.log(`App is listening at http://localhost:${port}`);
});