import { Router } from 'express';
import multer from 'multer';

import {
  patientPhotoStorage,
  prescriptionScanStorage,
} from '../../cloudinary/index.js';
import { controllerWrapper as wrapper } from '../../middlewares/controllerWrapper.js';
import patientController from '../controllers/patientController.js';
import appointmentController from '../controllers/appointmentController.js';
import messageController from '../controllers/messageController.js';
import prescriptionController from '../controllers/prescriptionController.js';
import therapistController from '../controllers/therapistController.js';

export const therapistRouter = Router();

therapistRouter.get('/me', wrapper(therapistController.getConnectedTherapist));
therapistRouter.delete('/me', wrapper(therapistController.deleteConnectedTherapist));
therapistRouter.patch('/me', wrapper(therapistController.updateConnectedTherapist));
