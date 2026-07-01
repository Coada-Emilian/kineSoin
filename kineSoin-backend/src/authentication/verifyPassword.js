/**
 * @description Wraps scrypt password verification behind a simple helper.
 *
 * Rationale:
 * - Centralizes comparison logic so authentication layers don’t need to handle
 *   hashing details directly.
 * - Keeps password checks consistent across the codebase and avoids duplicate
 *   crypto usage.
 */


import { Scrypt } from './Scrypt.js';

export default function verifyPassword(plainPassword, hashedPassword) {
  return Scrypt.compare(plainPassword, hashedPassword);
}
