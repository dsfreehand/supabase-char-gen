import dotenv from 'dotenv';
dotenv.config({ path: __dirname + "/../.env" });

import express, { Request, Response } from 'express';

import charactersRoutes from './routes/characters';
import router from './routes/characters';

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});


// Use character routes
app.use('/characters', router);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
