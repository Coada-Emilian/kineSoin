/**
 * @function findOrThrow
 * @description
 * Retrieves a database record by its primary key and throws an error if it does not exist.
 *
 * This utility function:
 * - Queries the provided Sequelize model using `findByPk`.
 * - Checks whether a record exists for the given ID.
 * - Throws an error if the record is not found.
 * - Returns the found record if it exists.
 *
 * Behavior:
 * - Ensures that downstream code always receives a valid database entity.
 * - Prevents repetitive null-checking logic in controllers and services.
 * - Centralizes “not found” handling for consistency across the application.
 *
 * Error handling:
 * - Throws an Error with a descriptive message if no record is found.
 * - The error message includes the provided `label` for clearer context.
 *
 * @param {Object} model - Sequelize model used to query the database.
 * @param {number} id - Primary key ID of the record to retrieve.
 * @param {string} [label='Resource'] - Human-readable name used in error messages.
 *
 * @returns {Promise<Object>} The найден database record if found.
 *
 * @throws {Error} When no record is found for the given ID.
 *
 * @sideEffects
 * - Performs a database read operation.
 */

export async function findOrThrow(model, id, label = 'Resource') {
  const record = await model.findByPk(id);

  if (!record) {
    throw new Error(`${label} not found`);
  }

  return record;
}
