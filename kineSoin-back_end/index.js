import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

import { bodySanitizer } from './src/server_folders/middlewares/bodySanitizer.js';
import { publicRouter } from './src/server_folders/routers/publicRouter.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const corsOptions = {
  origin: process.env.ALLOWED_DOMAINS,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(bodySanitizer);

app.use('/api/public', publicRouter);

app.disable('x-powered-by');

app.use(express.static(path.join(__dirname, 'src/assets')));

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`kineSoin server has started at http://localhost:${port}`);
});
