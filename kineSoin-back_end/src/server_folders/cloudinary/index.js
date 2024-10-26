/**
 * @fileoverview This module configures Cloudinary storage for image uploads, facilitating
 * the storage of various types of images and documents related to patients, therapists,
 * prescriptions, and insurance.
 *
 * It sets up the Cloudinary API with credentials from environment variables and creates
 * specific storage configurations for:
 * - Patient photos
 * - Therapist photos
 * - Prescription scans
 * - Insurance scans
 *
 * Each storage configuration specifies a dedicated folder in Cloudinary and allows
 * specific image formats for uploads.
 *
 * Usage:
 * - Import the configured storage objects for use with multer middleware in routes handling
 * image uploads.
 *
 * @module CloudinaryConfig
 * @requires cloudinary
 * @requires multer-storage-cloudinary
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
    allowed_formats: ['jpg', 'jpeg', 'png', 'pdf'],
  },
});

// Configure cloudinary storage for insurance scans.
const insuranceScanStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'insurance_scans',
    allowed_formats: ['jpg', 'jpeg', 'png', 'pdf'],
  },
});

export {
  patientPhotoStorage,
  therapistPhotoStorage,
  prescriptionScanStorage,
  insuranceScanStorage,
};
