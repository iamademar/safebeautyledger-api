import { ethers, Wallet } from 'ethers';

const ALCHEMY_API_URL = process.env.ALCHEMY_API_URL;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const CONTRACT_ABI = JSON.parse(process.env.CONTRACT_ABI || '[]');

const PRIVATE_KEY = process.env.PRIVATE_KEY;
if (!PRIVATE_KEY) {
  throw new Error('PRIVATE_KEY is not set in the environment variables');
}

export interface BeautyProductContract extends ethers.BaseContract {
  addBeautyProduct(product_id: string, jsonData: string): Promise<ethers.ContractTransactionResponse>;
  updateProduct(product_id: string, jsonData: string): Promise<ethers.ContractTransactionResponse>;
  getBeautyProduct(product_id: string): Promise<[string, string]>;
  getProductHistory(product_id: string): Promise<any[]>;
  getBeautyProductCount(): Promise<bigint>;
  getAllLatestProducts(): Promise<[string[], string[]]>;
}

export const provider = new ethers.JsonRpcProvider(ALCHEMY_API_URL);
export const contract = new ethers.Contract(CONTRACT_ADDRESS || '', CONTRACT_ABI, provider) as unknown as BeautyProductContract;
const wallet = new Wallet(PRIVATE_KEY, provider);
export const contractWithSigner = contract.connect(wallet) as BeautyProductContract;