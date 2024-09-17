"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllLatestProducts = exports.getBeautyProductCount = exports.getProductHistory = exports.getBeautyProduct = exports.updateProduct = exports.addBeautyProduct = void 0;
const ethereum_1 = require("../config/ethereum");
const addBeautyProduct = async (req, res) => {
    try {
        const { product_id, jsonData } = req.body;
        const txResponse = await ethereum_1.contractWithSigner.addBeautyProduct(product_id, jsonData);
        const receipt = await txResponse.wait();
        if (receipt) {
            res.json({ success: true, message: 'Beauty product added successfully', transactionHash: receipt.hash });
        }
        else {
            res.status(500).json({ success: false, error: 'Failed to get transaction receipt' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.addBeautyProduct = addBeautyProduct;
const updateProduct = async (req, res) => {
    try {
        const { product_id, jsonData } = req.body;
        const txResponse = await ethereum_1.contractWithSigner.updateProduct(product_id, jsonData);
        const receipt = await txResponse.wait();
        if (receipt) {
            res.json({ success: true, message: 'Product updated successfully', transactionHash: receipt.hash });
        }
        else {
            res.status(500).json({ success: false, error: 'Failed to get transaction receipt' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.updateProduct = updateProduct;
const getBeautyProduct = async (req, res) => {
    try {
        const { product_id } = req.params;
        const [id, jsonData] = await ethereum_1.contract.getBeautyProduct(product_id);
        res.json({ success: true, product_id: id, data: JSON.parse(jsonData) });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.getBeautyProduct = getBeautyProduct;
const getProductHistory = async (req, res) => {
    try {
        const { product_id } = req.params;
        const history = await ethereum_1.contract.getProductHistory(product_id);
        const formattedHistory = history.map((version) => ({
            jsonData: JSON.parse(version.jsonData),
            timestamp: new Date(Number(version.timestamp) * 1000).toISOString()
        }));
        res.json({ success: true, history: formattedHistory });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.getProductHistory = getProductHistory;
const getBeautyProductCount = async (req, res) => {
    try {
        const count = await ethereum_1.contract.getBeautyProductCount();
        res.json({ success: true, count: count.toString() });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.getBeautyProductCount = getBeautyProductCount;
const getAllLatestProducts = async (req, res) => {
    try {
        const [productIds, latestJsonData] = await ethereum_1.contract.getAllLatestProducts();
        const formattedProducts = productIds.map((id, index) => ({
            product_id: id,
            data: JSON.parse(latestJsonData[index])
        }));
        res.json({ success: true, products: formattedProducts });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.getAllLatestProducts = getAllLatestProducts;
