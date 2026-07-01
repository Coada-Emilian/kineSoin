/**
 * @description Updates an existing therapist account associated with an authenticated admin.
 *
 * Responsibilities:
 * - Validates the provided admin identifier.
 * - Ensures the admin exists before modifying data.
 * - Validates the therapist identifier.
 * - Ensures the therapist exists.
 * - Applies provided changes while preserving existing values.
 * - Handles optional therapist profile picture updates.
 * - Updates generated fields such as the full phone number.
 * - Persists the updated therapist information.
 *
 * Notes:
 * - This service contains business logic and database operations only.
 * - It does not depend on Express request/response objects.
 */

import { v2 as cloudinary } from 'cloudinary';
import { Admin, Therapist } from '../../../models/index.js';
import { findOrThrow } from '../../../utils/findOrThrow.js';
import { getValidId } from '../../../utils/getValidId.js';

export default async function updateTherapistAsAdmin({
  adminId,
  therapistId,
  therapistData,
}) {
  const admin_id = getValidId(adminId, 'Admin ID');

  await findOrThrow(Admin, admin_id, 'Admin');

  const therapist_id = getValidId(therapistId, 'Therapist ID');

  const foundTherapist = await findOrThrow(
    Therapist,
    therapist_id,
    'Therapist'
  );

  const {
    status,
    name,
    email,
    surname,
    diploma,
    experience,
    specialty,
    phone_number,
    description,
    licence_code,
    prefix,
  } = therapistData;

  const picture_id = therapistData.file ? therapistData.file.filename : null;

  const newTherapistData = {
    status: status ?? foundTherapist.status,
    name: name ?? foundTherapist.name,
    surname: surname ?? foundTherapist.surname,
    diploma: diploma ?? foundTherapist.diploma,
    email: email ?? foundTherapist.email,
    experience: experience ?? foundTherapist.experience,
    specialty: specialty ?? foundTherapist.specialty,
    phone_number: phone_number ?? foundTherapist.phone_number,
    description: description ?? foundTherapist.description,
    licence_code: licence_code ?? foundTherapist.licence_code,
    prefix: prefix ?? foundTherapist.prefix,
    ...(therapistData.file && {
      picture_url: therapistData.file.path,
      picture_id: therapistData.file.filename,
    }),
  };

  newTherapistData.full_phone_number =
    newTherapistData.prefix + newTherapistData.phone_number;

  const newTherapist = await foundTherapist.update(newTherapistData);

  if (!newTherapist) {
    try {
      await cloudinary.uploader.destroy(picture_id);
    } catch (err) {
      console.error('Error deleting old picture from Cloudinary:', err.message);
    }
    throw new Error('The therapist was not created');
  }

  return newTherapist;
}
