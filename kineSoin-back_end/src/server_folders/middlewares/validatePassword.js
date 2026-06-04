import { Scrypt } from '../authentification/Scrypt.js';

export default function validatePassword(plainPassword, hashedPassword) {
  return Scrypt.compare(plainPassword, hashedPassword);
}
