/**
 * @description Initializes a PostgreSQL client using the connection string from the environment.
 *
 * Architectural reasoning:
 * - The client is created once and exported so the application shares a single connection
 *   configuration, preventing inconsistent DB access patterns across modules.
 *
 * Security considerations:
 * - The connection URL is loaded from environment variables to avoid hard‑coding credentials
 *   and to support different environments (dev, staging, production) without code changes.
 *
 * Operational note:
 * - The module assumes PG_URL is defined; missing credentials should fail fast rather than
 *   creating a partially configured client.
 */


import 'dotenv/config';
import pg from 'pg';

const { Client } = pg;

export const pgClient = new Client(process.env.PG_URL);
