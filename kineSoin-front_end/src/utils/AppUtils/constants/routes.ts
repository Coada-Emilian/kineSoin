export const adminRoutes: {
  path: string;
  entityType: 'therapist' | 'patient' | 'affliction' | 'medic' | 'insurance';
}[] = [
  {
    path: 'therapists',
    entityType: 'therapist',
  },
  { path: 'therapists/:id', entityType: 'therapist' },
  { path: 'patients', entityType: 'patient' },
  { path: 'patients/:id', entityType: 'patient' },
  { path: 'afflictions', entityType: 'affliction' },
  { path: 'afflictions/:id', entityType: 'affliction' },
  { path: 'medics', entityType: 'medic' },
  { path: 'medics/:id', entityType: 'medic' },
  { path: 'insurances', entityType: 'insurance' },
  { path: 'insurances/:id', entityType: 'insurance' },
];

export const patientRoutes = [
  { path: 'dashboard', boolean: 'isPatientDashboardMain' },
  { path: 'new-prescription', boolean: 'isPatientPrescriptionMain' },
  { path: 'appointments', boolean: 'isPatientAppointmentsMain' },
  { path: 'messages', boolean: 'isPatientMessagesMain' },
  { path: 'my-therapist', boolean: 'isPatientTherapistPage' },
  { path: 'my-profile', boolean: 'isPatientDetailsMain' },
];

export const therapistRoutes = [
  { path: 'dashboard', boolean: 'isTherapistDashboardMain' },
  { path: 'patients', boolean: 'isTherapistPatientsMain' },
  { path: 'appointments', boolean: 'isTherapistAppointmentsMain' },
  { path: 'messages', boolean: 'isTherapistMessagesMain' },
  { path: 'my-profile', boolean: 'isTherapistProfileMain' },
  { path: 'prescriptions', boolean: 'isTherapistPrescriptionsMain' },
];
