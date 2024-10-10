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

Admin.hasMany(Therapist, {
  foreignKey: 'admin_id',
  as: 'therapists',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
Therapist.belongsTo(Admin, {
  foreignKey: 'admin_id',
  as: 'admin',
});

Admin.hasMany(Medic, {
  foreignKey: 'admin_id',
  as: 'medics',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
Medic.belongsTo(Admin, {
  foreignKey: 'admin_id',
  as: 'admin',
});

Admin.hasMany(Body_region, {
  foreignKey: 'admin_id',
  as: 'body_regions',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
Body_region.belongsTo(Admin, {
  foreignKey: 'admin_id',
  as: 'admin',
});

Admin.hasMany(Affliction, {
  foreignKey: 'admin_id',
  as: 'afflictions',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
Affliction.belongsTo(Admin, {
  foreignKey: 'admin_id',
  as: 'admin',
});

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
  foreignKey: 'body_region_id',
  as: 'afflictions',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
Affliction.belongsTo(Body_region, {
  foreignKey: 'body_region_id',
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

Patient.hasMany(Patient_message, {
  foreignKey: 'sender_id',
  as: 'sent_messages',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
Patient_message.belongsTo(Patient, {
  foreignKey: 'sender_id',
  as: 'sender',
});
Therapist.hasMany(Patient_message, {
  foreignKey: 'receiver_id',
  as: 'received_messages',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
Patient_message.belongsTo(Therapist, {
  foreignKey: 'receiver_id',
  as: 'receiver',
});

Patient.hasMany(Therapist_message, {
  foreignKey: 'receiver_id',
  as: 'received_messages',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
Therapist_message.belongsTo(Patient, {
  foreignKey: 'receiver_id',
  as: 'receiver',
});

Therapist.hasMany(Therapist_message, {
  foreignKey: 'sender_id',
  as: 'sent_messages',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
Therapist_message.belongsTo(Therapist, {
  foreignKey: 'sender_id',
  as: 'sender',
});

export {
  Admin,
  Affliction,
  Appointment,
  Body_region,
  Medic,
  Patient,
  Prescription,
  Therapist,
  Patient_message,
  Therapist_message,
};
