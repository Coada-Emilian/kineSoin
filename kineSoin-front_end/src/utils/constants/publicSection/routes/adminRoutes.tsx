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
