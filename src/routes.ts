import { Router } from 'express';
import { getItems, getItemById, createItem, login } from './controllers';
import { 
  addBeautyProduct, 
  updateProduct, 
  getBeautyProduct, 
  getProductHistory, 
  getBeautyProductCount,
  getAllLatestProducts
} from './controllers/ethereumController';

const router = Router();

// Define your API endpoints
router.get('/items', getItems);
router.get('/items/:id', getItemById);
router.post('/items', createItem);
router.post('/login', login);

// Beauty Product routes
router.post('/beauty-products', addBeautyProduct);
router.put('/beauty-products/:product_id', updateProduct);
router.get('/beauty-products/:product_id', getBeautyProduct);
router.get('/beauty-products/:product_id/history', getProductHistory);
router.get('/beauty-products-count', getBeautyProductCount);
router.get('/beauty-products', getAllLatestProducts);

export default router;
