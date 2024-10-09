import { pgClient } from './pgClient.js';
import { Scrypt } from '../src/authentification/Scrypt.js';
import patients from './data/patient_data.json';
import medics from './data/medic_data.json';
import therapists from './data/therapist_data.json';
import admins from './data/admin_data.json';

await pgClient.connect();

for (const therapist of therapists) {
  const { name, surname, email, picture_url } = therapist;
  const hashedPassword = Scrypt.hash('therapist.password');
  const hashedLicenceNumber = Scrypt.hash('therapist.licence_number');
  const query = `INSERT INTO therapists (name, surname, email, password, picture_url, license_number) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
  const result = await pgClient.query(query, [
    name,
    surname,
    email,
    hashedPassword,
    picture_url,
    hashedLicenceNumber,
  ]);
  console.log(result.rows);
}

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

  const hashedPassword = Scrypt.hash('patient.password');

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

for (const admin of admins) {
  const { name, email } = admin;
  const hashedPassword = Scrypt.hash('admin.password');
  const query = `INSERT INTO administrators (name, email, password) VALUES ($1, $2, $3) RETURNING *`;
  const result = await pgClient.query(query, [name, email, hashedPassword]);
  console.log(result.rows);
}

for (const medic of medics) {
  const {
    name,
    surname,
    street_number,
    street_name,
    postal_code,
    city,
    phone_number,
  } = medic;
  const hashedLicenceNumber = Scrypt.hash('medic.licence_number');
  const query = `INSERT INTO medics (name, surname, street_number, street_name, postal_code, city, phone_number, license_number ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`;
  const result = await pgClient.query(query, [
    name,
    surname,
    street_number,
    street_name,
    postal_code,
    city,
    phone_number,
    hashedLicenceNumber,
  ]);
  console.log(result.rows);
}

await pgClient.end();
