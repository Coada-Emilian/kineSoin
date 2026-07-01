/**
 * @description Handles password hashing and verification using scrypt.
 *
 * Rationale:
 * - Uses per‑password salts and strong scrypt parameters to resist brute‑force attacks.
 * - timingSafeEqual prevents timing‑based leaks during comparisons.
 *
 * Notes:
 * - Output format "<hash>.<salt>" keeps storage simple while preserving salt uniqueness.
 * - Hashing settings are tuned for a good balance between security and performance.
 */


import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';

export class Scrypt {
  // Hashes a password using scrypt algorithm.
  static hash(password) {
    const salt = randomBytes(16).toString('hex');

    const buffer = scryptSync(password, salt, 64, {
      N: 131072,
      maxmem: 134220800,
    });

    return `${buffer.toString('hex')}.${salt}`;
  }

  // Compares a plain text password with a hashed password.
  static compare(plainTextPassword, hash) {
    const [hashedPassword, salt] = hash.split('.');

    const hashedPasswordBuffer = Buffer.from(hashedPassword, 'hex');

    const cleanPasswordBuffer = scryptSync(plainTextPassword, salt, 64, {
      N: 131072,
      maxmem: 134220800,
    });

    return timingSafeEqual(hashedPasswordBuffer, cleanPasswordBuffer);
  }
}
