import express, { Request, Response } from 'express';
import cors from 'cors';
import { data } from './data';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.get('/api/resources', (req: Request, res: Response) => {
  const { location, category } = req.query;
  let items = data;
  if (location) {
    items = data.filter((item) => item.location === location);
  }
  if (category) {
    items = data.filter((item) => item.category === category);
  }

  res.status(200).json({
    items,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});