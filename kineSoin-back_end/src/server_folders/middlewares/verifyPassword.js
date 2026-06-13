import { Scrypt } from '../authentification/Scrypt.js';

export default function verifyPassword(plainPassword, hashedPassword) {
  return Scrypt.compare(plainPassword, hashedPassword);
}
