/**
 * @description Ensures a database record exists for the given model and ID,
 *              throwing a clear, contextual error when the lookup fails.
 *
 * Rationale:
 * - Centralizes existence‑checks to keep controllers clean and ensure consistent
 *   error messaging across the application.
 * - Protects downstream logic by preventing operations on missing or invalid
 *   records.
 *
 * Notes:
 * - Accepts any Sequelize model and performs a primary‑key lookup.
 * - Throws a descriptive error using the provided `label` when no record is found.
 * - Returns the located record unchanged for further processing.
 */


export async function findOrThrow(model, id, label = 'Resource') {
  const record = await model.findByPk(id);

  if (!record) {
    throw new Error(`${label} not found`);
  }

  return record;
}
