/**
 * @fileoverview This file creates a PostgreSQL client to connect to the database.
 *
 * It imports the required modules and initializes a PostgreSQL client using the connection URL
 * specified in the environment variable PG_URL.
 *
 * Usage:
 * - The pgClient can be used to interact with the PostgreSQL database for executing queries and
 * managing transactions.
 *
 * @module PostgreSQLClient
 * @exports pgClient
 * @requires dotenv
 * @requires pg
 */

import 'dotenv/config';
import pg from 'pg';

const { Client } = pg;

export const pgClient = new Client(process.env.PG_URL);
