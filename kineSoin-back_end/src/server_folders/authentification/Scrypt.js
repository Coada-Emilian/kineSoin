// Purpose: Hash and compare passwords using scrypt algorithm.

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
