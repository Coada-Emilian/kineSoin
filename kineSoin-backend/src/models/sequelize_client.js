/**
 * @description Centralizes the export of all Sequelize models and the database client.
 *
 * Rationale:
 * - Provides a single, predictable entry point for the entire data layer, so other
 *   modules can import models without navigating multiple file paths.
 * - Ensures that only fully associated models (from the main associations file) are
 *   exposed, preventing inconsistent loading order or accidental circular imports.
 *
 * Notes:
 * - Keeps the application’s database setup clean by pairing the sequelize instance
 *   with all initialized models in one place.
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
