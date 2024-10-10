import { Admin } from './standalone_models/Admin';
import { Affliction } from './standalone_models/Affliction';
import { Appointment } from './standalone_models/Appointment';
import { Body_region } from './standalone_models/Body_region';
import { Medic } from './standalone_models/Medic';
import { Patient } from './standalone_models/Patient';
import { Prescription } from './standalone_models/Prescription';
import { Therapist } from './standalone_models/Therapist';
import { Patient_message } from './standalone_models/Patient_message';
import { Therapist_message } from './standalone_models/Therapist_message';

Therapist.hasMany(Patient, {
  foreignKey: 'therapist_id',
  as: 'patients',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
Patient.belongsTo(Therapist, {
  foreignKey: 'therapist_id',
  as: 'therapist',
});

Medic.hasMany(Prescription, {
  foreignKey: 'medic_id',
  as: 'prescriptions',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
Prescription.belongsTo(Medic, {
  foreignKey: 'medic_id',
  as: 'medic',
});

Affliction.hasMany(Prescription, {
  foreignKey: 'affliction_id',
  as: 'prescriptions',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
Prescription.belongsTo(Affliction, {
  foreignKey: 'affliction_id',
  as: 'affliction',
});

Patient.hasMany(Prescription, {
  foreignKey: 'patient_id',
  as: 'prescriptions',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
Prescription.belongsTo(Patient, {
  foreignKey: 'patient_id',
  as: 'patient',
});

Body_region.hasMany(Affliction, {
  foreignKey: 'region_id',
  as: 'afflictions',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
Affliction.belongsTo(Body_region, {
  foreignKey: 'region_id',
  as: 'body_region',
});

Prescription.hasMany(Appointment, {
  foreignKey: 'prescription_id',
  as: 'appointments',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
Appointment.belongsTo(Prescription, {
  foreignKey: 'prescription_id',
  as: 'prescription',
});


