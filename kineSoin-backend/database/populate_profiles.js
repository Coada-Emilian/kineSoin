/**
 * @description Seeds the database with initial profiles for all user roles.
 *
 * Rationale:
 * - Provides predictable baseline data for development and testing.
 * - Uses Scrypt hashing to ensure seeded credentials follow the same security rules
 *   as real user accounts.
 *
 * Notes:
 * - Assumes JSON fixtures match the schema.
 * - Direct SQL inserts are used for speed and to avoid ORM overhead during bulk setup.
 */

import { Scrypt } from '../src/server_folders/authentification/Scrypt.js';
import admins from './data/admin_data.json' with { type: 'json' };
import medics from './data/medic_data.json' with { type: 'json' };
import patients from './data/patient_data.json' with { type: 'json' };
import therapists from './data/therapist_data.json' with { type: 'json' };
import { pgClient } from './pgClient.js';

await pgClient.connect();

// Inserting admin profiles into the database
for (const admin of admins) {
  const { name, email } = admin;

  const hashedPassword = Scrypt.hash(admin.password);

  const query = `INSERT INTO administrators (name, email, password) VALUES ($1, $2, $3) RETURNING *`;

  await pgClient.query(query, [name, email, hashedPassword]);
  console.log(`👨‍💼 Admin ${name} inserted 👨‍💼`);
}

console.log('🛠️ Admins inserted 🛠️');

// Inserting therapist profiles into the database
for (const therapist of therapists) {
  const {
    admin_id,
    name,
    surname,
    description,
    diploma,
    experience,
    specialty,
    prefix,
    phone_number,
    email,
    picture_url,
    licence_code,
    status,
  } = therapist;

  const hashedPassword = Scrypt.hash(therapist.password);

  const query = `INSERT INTO therapists (admin_id, name, surname, description, diploma, experience, specialty, prefix, phone_number, email, password, picture_url, licence_code, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *`;

  await pgClient.query(query, [
    admin_id,
    name,
    surname,
    description,
    diploma,
    experience,
    specialty,
    prefix,
    phone_number,
    email,
    hashedPassword,
    picture_url,
    licence_code,
    status,
  ]);

  console.log(`👩‍⚕️ Therapist ${name} ${surname} inserted 👩‍⚕️`);
}

console.log('💆🏻‍♀️ Therapists inserted 💆🏻‍♀️');

// Inserting medic profiles into the database
for (const medic of medics) {
  const {
    admin_id,
    name,
    surname,
    street_number,
    street_name,
    postal_code,
    city,
    prefix,
    phone_number,
    licence_code,
    email,
  } = medic;

  const query = `INSERT INTO medics (admin_id, name, surname, street_number, street_name, postal_code, city, prefix, phone_number, licence_code, email ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`;

  await pgClient.query(query, [
    admin_id,
    name,
    surname,
    street_number,
    street_name,
    postal_code,
    city,
    prefix,
    phone_number,
    licence_code,
    email,
  ]);

  console.log(`👩🏻‍⚕️ Medic ${name} ${surname} inserted 👩🏻‍⚕️`);
}

console.log('👩🏻‍⚕️ Medics inserted 👩🏻‍⚕️');

// Inserting patient profiles into the database
for (const patient of patients) {
  const {
    therapist_id,
    name,
    birth_name,
    surname,
    gender,
    birth_date,
    street_number,
    street_name,
    postal_code,
    city,
    prefix,
    phone_number,
    email,
    status,
    picture_url,
  } = patient;

  const hashedPassword = Scrypt.hash(patient.password);

  const query = `INSERT INTO patients (therapist_id, name, birth_name, surname, gender, birth_date, street_number, street_name, postal_code, city, prefix, phone_number, email, password, status, picture_url) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) RETURNING *`;

  await pgClient.query(query, [
    therapist_id,
    name,
    birth_name,
    surname,
    gender,
    birth_date,
    street_number,
    street_name,
    postal_code,
    city,
    prefix,
    phone_number,
    email,
    hashedPassword,
    status,
    picture_url,
  ]);

  console.log(`👩‍👩‍👦‍👦 Patient ${name} ${surname} inserted 👩‍👩‍👦‍👦`);
}

console.log('👩‍👩‍👦‍👦 Patients inserted 👩‍👩‍👦‍👦');

await pgClient.end();
