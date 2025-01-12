import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import refugeRoutes from './routes/refuges.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Routes
app.use('/api', refugeRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});