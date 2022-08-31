import express, { json } from 'express';
import cors from 'cors';
import 'express-async-errors';
import dotenv from 'dotenv';

import router from './routes/index.js';
import errorHandler from './middlewares/errorHandler.js';

dotenv.config();

const app = express();

app.use(cors(), json());
app.use(router);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
