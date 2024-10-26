/**
 * @fileoverview This file populates the database with profiles from various data files.
 *
 * It connects to a PostgreSQL database and inserts profiles for administrators, therapists,
 * patients, and medics using hashed passwords for security. The data is loaded from JSON files
 * and each profile is inserted into its respective table in the database.
 *
 * Usage:
 * - The script connects to the database, reads profile data from JSON files, hashes passwords,
 * and inserts the data into the appropriate tables. It also logs the results of the insert
 * operations to the console.
 *
 * @module DatabasePopulator
 * @requires pgClient
 * @requires Scrypt
 * @requires patient_data.json
 * @requires medic_data.json
 * @requires therapist_data.json
 * @requires admin_data.json
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
  const result = await pgClient.query(query, [name, email, hashedPassword]);
  console.log(result.rows);
}

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

  const result = await pgClient.query(query, [
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
  console.log(result.rows);
}

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

  const result = await pgClient.query(query, [
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
  console.log(result.rows);
}

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
  const result = await pgClient.query(query, [
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
  console.log(result.rows);
}

await pgClient.end();
