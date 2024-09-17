"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contractWithSigner = exports.contract = exports.provider = void 0;
const ethers_1 = require("ethers");
const ALCHEMY_API_URL = process.env.ALCHEMY_API_URL;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const CONTRACT_ABI = JSON.parse(process.env.CONTRACT_ABI || '[]');
const PRIVATE_KEY = process.env.PRIVATE_KEY;
if (!PRIVATE_KEY) {
    throw new Error('PRIVATE_KEY is not set in the environment variables');
}
exports.provider = new ethers_1.ethers.JsonRpcProvider(ALCHEMY_API_URL);
exports.contract = new ethers_1.ethers.Contract(CONTRACT_ADDRESS || '', CONTRACT_ABI, exports.provider);
const wallet = new ethers_1.Wallet(PRIVATE_KEY, exports.provider);
exports.contractWithSigner = exports.contract.connect(wallet);
