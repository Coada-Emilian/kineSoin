/**
 * @fileoverview This module provides functionality for hashing and comparing passwords
 * using the scrypt algorithm.
 *
 * It includes methods to hash a password securely by generating a random salt and using the
 * scrypt algorithm to derive a secure hash. Additionally, it provides a method to compare
 * a plain text password with a hashed password to verify user credentials.
 *
 * Usage:
 * - Use the `Scrypt.hash` method to hash passwords before storing them.
 * - Use the `Scrypt.compare` method to verify user credentials during authentication.
 *
 * @module Scrypt
 * @requires node:crypto
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
