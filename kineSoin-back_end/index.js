import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

import { bodySanitizer } from './src/server_folders/middlewares/bodySanitizer.js';
import { publicRouter } from './src/server_folders/routing/routers/publicRouter.js';
import { patientRouter } from './src/server_folders/routing/routers/patientRouter.js';
import { therapistRouter } from './src/server_folders/routing/routers/therapistRouter.js';
import { adminRouter } from './src/server_folders/routing/routers/adminRouter.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const corsOptions = {
  origin: process.env.ALLOWED_DOMAINS,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(bodySanitizer);

app.use('/api/public', publicRouter);
app.use('/api/patient', patientRouter);
app.use('/api/therapist', therapistRouter);
app.use('/api/admin', adminRouter);

app.disable('x-powered-by');

app.use(express.static(path.join(__dirname, 'src/assets')));

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`kineSoin server has started at http://localhost:${port}`);
});
