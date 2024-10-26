/**
 * @fileoverview This module creates and exports a Sequelize instance
 * for connecting to the PostgreSQL database. It configures the
 * connection settings based on the environment (development or production).
 *
 * The exported `sequelize` instance is used to interact with the
 * database, and it includes options for logging and defining
 * custom column names for created and updated timestamps.
 *
 * In production, it also configures SSL options for secure connections.
 *
 * @module SequelizeConnection
 *
 * @exports sequelize
 *
 * @example
 * // Importing the sequelize instance in another file
 * import { sequelize } from './sequelize_client.js';
 *
 * // Authenticating the connection
 * sequelize.authenticate()
 *   .then(() => {
 *     console.log('Connection has been established successfully.');
 *   })
 *   .catch(err => {
 *     console.error('Unable to connect to the database:', err);
 *   });
 *
 * @throws {Error} Throws an error if NODE_ENV is not set to
 * either "development" or "production".
 */

import 'dotenv/config';
import { Sequelize } from 'sequelize';

export let sequelize;

// Create a Sequelize instance and authenticate it depending on the environment.
if (process.env.NODE_ENV === 'development') {
  sequelize = new Sequelize(process.env.PG_URL, {
    logging: false,
    define: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  });
} else if (process.env.NODE_ENV === 'production') {
  sequelize = new Sequelize(process.env.PG_URL, {
    logging: false,
    define: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  });
} else {
  throw new Error(
    'NODE_ENV must be set to either "development" or "production"'
  );
}

sequelize.authenticate();
