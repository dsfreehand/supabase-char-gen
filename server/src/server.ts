import express from 'express';
import charactersRoutes from './routes/characters';

const app = express();
app.use(express.json());

// Use character routes
app.use('/characters', charactersRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
