/**
 * @description Creates a new instance of a PostgreSQL client to connect to the database.
 *
 * This module:
 * - Loads environment variables using dotenv.
 * - Imports the 'pg' package.
 * - Initializes a new PostgreSQL client with the connection URL from environment variables.
 *
 * Ensure that the PG_URL variable is set in the environment before running this module.
 */

import 'dotenv/config';
import pg from 'pg';

const { Client } = pg;

export const pgClient = new Client(process.env.PG_URL);
