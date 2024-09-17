"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors = require('cors');
const morgan_1 = __importDefault(require("morgan"));
const routes_1 = __importDefault(require("./routes"));
const ethers_1 = require("ethers");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
const ALCHEMY_API_URL = process.env.ALCHEMY_API_URL;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const CONTRACT_ABI = JSON.parse(process.env.CONTRACT_ABI || '[]');
// Update this line
const provider = new ethers_1.ethers.JsonRpcProvider(ALCHEMY_API_URL);
const contract = new ethers_1.ethers.Contract(CONTRACT_ADDRESS || '', CONTRACT_ABI, provider);
app.use(cors());
// Middleware to parse JSON bodies
app.use(express_1.default.json());
// Add Morgan middleware for logging
app.use((0, morgan_1.default)(':method :url :status :res[content-length] - :response-time ms'));
// Register routes
app.use('/api', routes_1.default);
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
