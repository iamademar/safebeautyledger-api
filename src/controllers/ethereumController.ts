import { Request, Response } from 'express';
import { contract, contractWithSigner, BeautyProductContract } from '../config/ethereum';

export const addBeautyProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { product_id, jsonData } = req.body;
    const txResponse = await contractWithSigner.addBeautyProduct(product_id, jsonData);
    const receipt = await txResponse.wait();
    if (receipt) {
      res.json({ success: true, message: 'Beauty product added successfully', transactionHash: receipt.hash });
    } else {
      res.status(500).json({ success: false, error: 'Failed to get transaction receipt' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: (error as Error).message });
  }
};

export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { product_id, jsonData } = req.body;
    const txResponse = await contractWithSigner.updateProduct(product_id, jsonData);
    const receipt = await txResponse.wait();
    if (receipt) {
      res.json({ success: true, message: 'Product updated successfully', transactionHash: receipt.hash });
    } else {
      res.status(500).json({ success: false, error: 'Failed to get transaction receipt' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: (error as Error).message });
  }
};

export const getBeautyProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { product_id } = req.params;
    const [id, jsonData] = await contract.getBeautyProduct(product_id);
    res.json({ success: true, product_id: id, data: JSON.parse(jsonData) });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: (error as Error).message });
  }
};

export const getProductHistory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { product_id } = req.params;
    const history = await contract.getProductHistory(product_id);
    const formattedHistory = history.map((version: any) => ({
      jsonData: JSON.parse(version.jsonData),
      timestamp: new Date(Number(version.timestamp) * 1000).toISOString()
    }));
    res.json({ success: true, history: formattedHistory });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: (error as Error).message });
  }
};

export const getBeautyProductCount = async (req: Request, res: Response): Promise<void> => {
  try {
    const count = await contract.getBeautyProductCount();
    res.json({ success: true, count: count.toString() });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: (error as Error).message });
  }
};

export const getAllLatestProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const [productIds, latestJsonData] = await contract.getAllLatestProducts();
    
    const formattedProducts = productIds.map((id: string, index: number) => ({
      product_id: id,
      data: JSON.parse(latestJsonData[index])
    }));

    res.json({ success: true, products: formattedProducts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: (error as Error).message });
  }
};