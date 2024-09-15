import express, { Application } from 'express';
const cors = require('cors');
import morgan from 'morgan';
import routes from './routes';
import { ethers } from 'ethers';
import dotenv from 'dotenv';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3001;

const ALCHEMY_API_URL = process.env.ALCHEMY_API_URL;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const CONTRACT_ABI = JSON.parse(process.env.CONTRACT_ABI || '[]');

// Update this line
const provider = new ethers.JsonRpcProvider(ALCHEMY_API_URL);
const contract = new ethers.Contract(CONTRACT_ADDRESS || '', CONTRACT_ABI, provider);

app.use(cors()); 
// Middleware to parse JSON bodies
app.use(express.json());

// Add Morgan middleware for logging
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

// Register routes
app.use('/api', routes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
