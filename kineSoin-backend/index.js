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

import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import { sanitizeRequestBody } from './src/middlewares/sanitizeRequestBody.js';
import { adminRouter } from './src/routing/routers/adminRouter.js';
import { authenticationRouter } from './src/routing/routers/authenticationRouter.js';
import { therapistRouter } from './src/routing/routers/therapistRouter.js';
import { errorHandler } from './src/utils/errorHandler.js';

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

app.use(sanitizeRequestBody);

app.use('/api/auth', authenticationRouter);

app.use('/api/admin', adminRouter);

app.use('/api/therapist', therapistRouter);

// app.use('/api/patient', patientRouter);

app.use(errorHandler);

app.disable('x-powered-by');

app.use(express.static(path.join(__dirname, 'src/assets')));

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`kineSoin server has started at http://localhost:${port}`);
});
