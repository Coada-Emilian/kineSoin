/**
 * @description Combines a date string and a time string into a single JavaScript
 *              `Date` object, ensuring consistent appointment‑datetime handling
 *              across the application.
 *
 * Rationale:
 * - Centralizes appointment‑datetime construction to avoid repeated parsing logic
 *   in controllers and services.
 * - Ensures predictable formatting by relying on ISO‑compatible concatenation.
 *
 * Notes:
 * - Expects both `dateStr` and `timeStr` to be valid ISO‑friendly strings.
 * - Returns a native `Date` instance representing the combined timestamp.
 * - Does not perform validation; upstream layers are responsible for ensuring
 *   correct formats.
 */

export default function getAppointmentDateTime(dateStr, timeStr) {
  return new Date(`${dateStr}T${timeStr}`);
}
