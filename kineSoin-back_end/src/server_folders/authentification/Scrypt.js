import { scryptSync, timingSafeEqual, randomBytes, scrypt } from 'node:crypto';

export class Scrypt {
  static hash(password) {
    const salt = randomBytes(16).toString('hex');
    const buffer = scryptSync(password, salt, 64, {
      N: 131072,
      maxmem: 134220800,
    });
    return `${buffer.toString('hex')}.${salt}`;
  }

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
