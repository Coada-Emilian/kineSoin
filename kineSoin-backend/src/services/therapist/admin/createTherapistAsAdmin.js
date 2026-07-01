/**
 * @description Creates a new therapist account associated with an authenticated admin.
 *
 * Responsibilities:
 * - Validates the provided admin identifier.
 * - Ensures the admin exists before creating data.
 * - Checks for existing therapist accounts.
 * - Verifies password confirmation.
 * - Hashes the therapist password before storage.
 * - Handles optional therapist profile picture information.
 * - Creates the therapist account in the database.
 * - Cleans up uploaded files if account creation fails.
 *
 * Notes:
 * - This service contains account creation business logic and database operations.
 * - It does not depend on Express request/response objects.
 */

import { v2 as cloudinary } from 'cloudinary';
import { Scrypt } from '../../../authentication/Scrypt.js';
import { Admin, Therapist } from '../../../models/index.js';
import { findOrThrow } from '../../../utils/findOrThrow.js';
import { getValidId } from '../../../utils/getValidId.js';

export default async function createTherapistAsAdmin({
  adminId,
  therapistData,
}) {
  const admin_id = getValidId(adminId, 'Admin ID');

  await findOrThrow(Admin, admin_id, 'Admin');

  const { password, repeated_password, email, ...rest } = therapistData;

  const existingTherapist = await Therapist.findOne({ where: { email } });

  if (existingTherapist) {
    throw new Error('This email address is already registered.');
  }

  if (password !== repeated_password) {
    throw new Error('Passwords do not match.');
  }

  const hashedPassword = Scrypt.hash(password);

  const therapist = await Therapist.create({
    ...rest,
    password: hashedPassword,
    email,
    status: therapistData.status || 'active',
    full_phone_number: `${therapistData.prefix}${therapistData.phone_number}`,
    ...(therapistData.file && {
      picture_url: therapistData.file.path,
      picture_id: therapistData.file.filename,
    }),
  });

  if (!therapist) {
    try {
      await cloudinary.uploader.destroy(picture_id);
    } catch (err) {
      console.error('Error deleting old picture from Cloudinary:', err.message);
    }
    throw new Error('The therapist was not created');
  }

  return therapist;
}
