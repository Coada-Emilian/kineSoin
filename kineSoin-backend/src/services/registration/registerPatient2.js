import { Scrypt } from '../../authentication/Scrypt.js';
import { Patient } from '../../models/index.js';
import computeAge from '../../utils/computeAge.js';

export default async function registerPatient(patientData) {
  const { email, password, repeated_password, birth_date, ...rest } =
    patientData;

  const age = computeAge(birth_date);

  if (age < 12) {
    throw new Error('Patients must be at least 12 years old to register.');
  }

  if (age > 120) {
    throw new Error('Please provide a valid birth date.');
  }

  const existingPatient = await Patient.findOne({
    where: { email },
  });

  if (existingPatient) {
    throw new Error('This email address is already registered.');
  }

  if (password !== repeated_password) {
    throw new Error('Passwords do not match.');
  }

  const hashedPassword = Scrypt.hash(password);

  const patient = await Patient.create({
    ...rest,
    email,
    birth_date,
    password: hashedPassword,
    status: 'pending',
    full_phone_number: `${patientData.prefix}${patientData.phone_number}`,
    ...(patientData.file && {
      picture_url: patientData.file.path,
      picture_id: patientData.file.filename,
    }),
  });

  return patient;
}
