"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("./controllers");
const ethereumController_1 = require("./controllers/ethereumController");
const router = (0, express_1.Router)();
// Define your API endpoints
router.get('/items', controllers_1.getItems);
router.get('/items/:id', controllers_1.getItemById);
router.post('/items', controllers_1.createItem);
router.post('/login', controllers_1.login);
// Beauty Product routes
router.post('/beauty-products', ethereumController_1.addBeautyProduct);
router.put('/beauty-products/:product_id', ethereumController_1.updateProduct);
router.get('/beauty-products/:product_id', ethereumController_1.getBeautyProduct);
router.get('/beauty-products/:product_id/history', ethereumController_1.getProductHistory);
router.get('/beauty-products-count', ethereumController_1.getBeautyProductCount);
router.get('/beauty-products', ethereumController_1.getAllLatestProducts);
exports.default = router;
