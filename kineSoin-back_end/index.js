/**
 * @description Sets up and configures the express application server.
 *
 * This module:
 * - Imports necessary dependencies including environment variables, express, path, cors, and session management.
 * - Imports middleware functions and route handlers.
 *
 * - Configures the express application:
 *   - Parses URL-encoded and JSON request bodies.
 *   - Configures CORS options based on allowed domains from environment variables.
 *   - Sets up session management with secret, resave, saveUninitialized, and cookie options.
 *   - Adds middleware for sanitizing request bodies.
 *
 * - Defines and mounts routers for different API endpoints:
 *   - /api/public: Public routes.
 *   - /api/patient: Patient-specific routes.
 *   - /api/therapist: Therapist-specific routes.
 *   - /api/admin: Admin-specific routes.
 *
 * - Disables the 'x-powered-by' header for security reasons.
 * - Serves static assets from the 'src/assets' directory.
 *
 * - Starts the server and listens on the specified port from environment variables.
 */

import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import session from 'express-session';

import { sanitizeRequestBody } from './src/server_folders/middlewares/sanitizeRequestBody.js';
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

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60,
    },
  })
);

app.use(cors(corsOptions));

app.use(sanitizeRequestBody);

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
