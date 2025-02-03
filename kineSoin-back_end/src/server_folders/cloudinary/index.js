/**
 * @description Configures cloudinary storage for patient, therapist, prescription, and insurance photos using the credentials from the .env file.
 *
 * This module:
 * - Configures cloudinary with the credentials (cloud name, API key, and API secret) from the .env file.
 * - Sets up cloudinary storage for patient photos.
 *   - Uses CloudinaryStorage to configure storage options.
 *   - Specifies the folder name "patient_photos".
 *   - Allows image formats such as 'jpg', 'jpeg', 'png', and 'webp'.
 * - Sets up cloudinary storage for therapist photos.
 *   - Uses CloudinaryStorage to configure storage options.
 *   - Specifies the folder name "therapist_photos".
 *   - Allows image formats such as 'jpg', 'jpeg', 'png', and 'webp'.
 * - Sets up cloudinary storage for prescription scans.
 *   - Uses CloudinaryStorage to configure storage options.
 *   - Specifies the folder name "prescription_scans".
 *   - Allows image formats such as 'jpg', 'jpeg', 'png', 'pdf', and 'webp'.
 * - Sets up cloudinary storage for insurance scans.
 *   - Uses CloudinaryStorage to configure storage options.
 *   - Specifies the folder name "insurance_scans".
 *   - Allows image formats such as 'jpg', 'jpeg', 'png', 'pdf', and 'webp'.
 *
 * Ensure that the cloudinary module and multer-storage-cloudinary are installed and properly configured before using this script.
 */

import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

// Configure cloudinary with the credentials from the .env file.
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure cloudinary storage for patient photos.
const patientPhotoStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'patient_photos',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
  },
});

// Configure cloudinary storage for therapist photos.
const therapistPhotoStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'therapist_photos',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
  },
});

// Configure cloudinary storage for prescription scans.
const prescriptionScanStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'prescription_scans',
    allowed_formats: ['jpg', 'jpeg', 'png', 'pdf', 'webp'],
  },
});

// Configure cloudinary storage for insurance scans.
const insuranceScanStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'insurance_scans',
    allowed_formats: ['jpg', 'jpeg', 'png', 'pdf', 'webp'],
  },
});

export {
  patientPhotoStorage,
  therapistPhotoStorage,
  prescriptionScanStorage,
  insuranceScanStorage,
};
