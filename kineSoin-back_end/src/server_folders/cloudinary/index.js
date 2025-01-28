// Purpose: Configure cloudinary storage for patient, therapist, prescription and insurance photos.

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
