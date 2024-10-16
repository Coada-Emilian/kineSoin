import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const patientPhotoStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'patient_photos',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
  },
});

const therapistPhotoStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'therapist_photos',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
  },
});

const prescriptionScanStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'prescription_scans',
    allowed_formats: ['jpg', 'jpeg', 'png', 'pdf'],
  },
});

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
