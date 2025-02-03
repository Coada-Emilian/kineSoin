/**
 * @description Populates the database with profiles of patients, therapists, medics, and administrators.
 *
 * This module:
 * - Connects to the PostgreSQL client.
 * - Imports profile data for patients, therapists, medics, and admins from JSON files.
 * - Hashes passwords using Scrypt for secure storage.
 * - Inserts profiles into the respective tables in the database.
 * - Logs progress for each group of profiles inserted.
 *
 * Ensure that the profile data JSON files are correctly formatted and available before running this module.
 */

import { pgClient } from './pgClient.js';
import { Scrypt } from '../src/server_folders/authentification/Scrypt.js';
import patients from './data/patient_data.json' with { type: 'json' };
import medics from './data/medic_data.json' with { type: 'json' };
import therapists from './data/therapist_data.json' with { type: 'json' };
import admins from './data/admin_data.json' with { type: 'json' };

await pgClient.connect();

// Inserting admin profiles into the database
for (const admin of admins) {
  const { name, email } = admin;
  const hashedPassword = Scrypt.hash(admin.password);
  const query = `INSERT INTO administrators (name, email, password) VALUES ($1, $2, $3) RETURNING *`;
  await pgClient.query(query, [name, email, hashedPassword]);
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
    email,
    picture_url,
    licence_code,
    status,
  } = therapist;

  const hashedPassword = Scrypt.hash(therapist.password);

  const query = `INSERT INTO therapists (admin_id, name, surname, description, diploma, experience, specialty, email, password, picture_url, licence_code, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *`;

  await pgClient.query(query, [
    admin_id,
    name,
    surname,
    description,
    diploma,
    experience,
    specialty,
    email,
    hashedPassword,
    picture_url,
    licence_code,
    status,
  ]);
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
    phone_number,
    licence_code,
  } = medic;

  const query = `INSERT INTO medics (admin_id, name, surname, street_number, street_name, postal_code, city, phone_number, licence_code ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`;
  await pgClient.query(query, [
    admin_id,
    name,
    surname,
    street_number,
    street_name,
    postal_code,
    city,
    phone_number,
    licence_code,
  ]);
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
    phone_number,
    email,
    status,
    picture_url,
  } = patient;

  const hashedPassword = Scrypt.hash(patient.password);

  const query = `INSERT INTO patients (therapist_id, name, birth_name, surname, gender, birth_date, street_number, street_name, postal_code, city, phone_number, email, password, status, picture_url) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING *`;

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
    phone_number,
    email,
    hashedPassword,
    status,
    picture_url,
  ]);
}

console.log('👩‍👩‍👦‍👦 Patients inserted 👩‍👩‍👦‍👦');

await pgClient.end();
