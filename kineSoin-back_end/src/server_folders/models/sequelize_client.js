/**
 * @description Creates a Sequelize instance and authenticates it depending on the environment (development or production).
 *
 * This module:
 * - Imports the necessary environment variables using dotenv/config.
 * - Imports the Sequelize class from the sequelize module.
 * - Declares a sequelize variable to hold the Sequelize instance.
 * - Creates a Sequelize instance and authenticates it based on the NODE_ENV environment variable.
 *   - If NODE_ENV is 'development':
 *     - Creates a Sequelize instance with the database URL from the PG_URL environment variable.
 *     - Disables logging.
 *     - Sets the default names for createdAt and updatedAt fields to 'created_at' and 'updated_at' respectively.
 *   - If NODE_ENV is 'production':
 *     - Creates a Sequelize instance with the database URL from the PG_URL environment variable.
 *     - Disables logging.
 *     - Sets the default names for createdAt and updatedAt fields to 'created_at' and 'updated_at' respectively.
 *     - Configures SSL settings to require SSL and not reject unauthorized certificates.
 *   - If NODE_ENV is neither 'development' nor 'production':
 *     - Throws an error indicating that NODE_ENV must be set to either 'development' or 'production'.
 * - Authenticates the Sequelize instance to ensure the connection to the database is successful.
 *
 * Ensure that the dotenv and sequelize modules are installed and that the necessary environment variables (NODE_ENV, PG_URL) are set before using this setup.
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
