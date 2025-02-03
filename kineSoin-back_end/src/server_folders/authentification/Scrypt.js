/**
 * @description Provides functionality to hash passwords using the scrypt algorithm and compare hashed passwords to plaintext passwords for authentication purposes.
 *
 * This module:
 * - Hashes a password using the scrypt algorithm from node:crypto.
 *   - Generates a random salt for each password.
 *   - Uses scryptSync to hash the password along with the salt.
 *   - Returns the hashed password combined with the salt in a single string, separated by a dot.
 * - Compares a plaintext password with a hashed password.
 *   - Extracts the hashed password and salt from the combined string.
 *   - Uses scryptSync to hash the plaintext password with the extracted salt.
 *   - Compares the hashed password and the freshly hashed plaintext password using timingSafeEqual to prevent timing attacks.
 *
 * Ensure that the node:crypto module is available and properly configured before using this script.
 */

import { scryptSync, timingSafeEqual, randomBytes, scrypt } from 'node:crypto';

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
