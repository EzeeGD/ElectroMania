// ! Dependencies
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

import path from 'path';
import fs from 'fs';

import { MercadoPagoConfig, Preference } from 'mercadopago';

// * Constants
const PRODUCTS_PATH = './data/products.json';

const app = express();
const PORT = process.env.PORT || 8082;
const client = new MercadoPagoConfig({
    accessToken: 'TEST-2311629547680354-112817-8128103c9c858a63c3dc5b58dba35a3f-223221824'
});

// * Middleware


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// * Routes

//app.use(express.static(path.join('../client')));
app.use("/", express.static("../client"));


app.get('/api/products', function(req, res) {
    try {
        const data = fs.readFileSync(PRODUCTS_PATH, 'utf8');
        const products = JSON.parse(data);

        res.status(200).json(products);
    } catch (error) {
        console.error("Error obtaining products:", error);
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
});

app.get('/api/pay', function(req, res) {
    const ids = req.body;
    const productsCopy = products.map((p) => ({ ...p }));
    ids.forEach((id) => {
        const product = productsCopy.find((p) => p.id === id);
        if (product.stock > 0) {
            product.stock--;
        } else {
            throw "Sin stock";
        }
    });
    products = productsCopy;
    res.send(products);
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

app.listen(PORT, () => {
    console.info(`Express Server started and listening in port ${PORT}`);
});