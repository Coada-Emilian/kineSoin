import { pgClient } from './pgClient.js';
import { Scrypt } from '../src/server_folders/authentification/Scrypt.js';
import patients from './data/patient_data.json' with { type: 'json' };
import medics from './data/medic_data.json' with { type: 'json' };
import therapists from './data/therapist_data.json' with { type: 'json' };
import admins from './data/admin_data.json' with { type: 'json' };

await pgClient.connect();

for (const admin of admins) {
  const { name, email } = admin;
  const hashedPassword = Scrypt.hash(admin.password);
  const query = `INSERT INTO administrators (name, email, password) VALUES ($1, $2, $3) RETURNING *`;
  const result = await pgClient.query(query, [name, email, hashedPassword]);
  console.log(result.rows);
}

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
  } = therapist;
  const hashedPassword = Scrypt.hash(therapist.password);
  const hashedLicenceCode = Scrypt.hash(therapist.licence_code);
  const query = `INSERT INTO therapists (admin_id, name, surname, description, diploma, experience, specialty, email, password, picture_url, licence_code) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`;
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
    hashedLicenceCode,
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
