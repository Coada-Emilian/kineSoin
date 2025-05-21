export const sideNavLinks = {
  admin: [
    { name: 'Tous les kinésithérapeutes', path: '/admin/therapists' },
    { name: 'Tous les patients', path: '/admin/patients' },
    { name: 'Afflictions', path: '/admin/afflictions' },
    { name: 'Médecins', path: '/admin/medics' },
    { name: "Organismes d'assurance", path: '/admin/insurances' },
  ],
  patient: [
    { name: 'Tableau de bord', path: '/patient/dashboard' },
    { name: 'Nouvelle ordonnance', path: '/patient/new-prescription' },
    { name: 'Rendez-vous', path: '/patient/appointments' },
    { name: 'Messages', path: '/patient/messages' },
    { name: 'Mon kinésithérapeute', path: '/patient/my-therapist' },
    { name: 'Mes informations', path: '/patient/my-profile' },
  ],
  therapist: [
    { name: 'Tableau de bord', path: '/therapist/dashboard' },
    { name: 'Patients', path: '/therapist/patients' },
    { name: 'Rendez-vous', path: '/therapist/appointments' },
    { name: 'Messages', path: '/therapist/messages' },
    { name: 'Mes informations', path: '/therapist/my-profile' },
    { name: 'Ordonnances', path: '/therapist/prescriptions' },
  ],
};
