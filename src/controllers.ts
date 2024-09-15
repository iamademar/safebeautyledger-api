import { Request, Response } from 'express';
import User from './models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


interface Item {
  id: number;
  name: string;
  description: string;
}

// Simulated in-memory database
const items: Item[] = [
  { id: 1, name: 'Item 1', description: 'This is item 1' },
  { id: 2, name: 'Item 2', description: 'This is item 2' }
];

// Get all items
export const getItems = (req: Request, res: Response): void => {
  res.json(items);
};

// Get item by ID
export const getItemById = (req: Request, res: Response): void => {
  const id = parseInt(req.params.id, 10);
  const item = items.find((item) => item.id === id);
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
};

// Create a new item
export const createItem = (req: Request, res: Response): void => {
  const newItem: Item = {
    id: items.length + 1,
    name: req.body.name,
    description: req.body.description
  };
  items.push(newItem);
  res.status(201).json(newItem);
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      res.status(401).json({ message: 'Invalid email or password' });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(401).json({ message: 'Invalid email or password' });
      return;
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '1h' }
    );
    console.log('token: ', token);
    res.json({ success: true,token, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};