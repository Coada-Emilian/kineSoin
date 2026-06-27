export const getAdminEntityStatusButtonsDetails = () => [
  {
    entityType: 'therapist',
    status: 'active',
    background: 'bg-green-300',
    hoverBackground: 'hover:bg-green-500',
    text: 'Actif',
  },
  {
    entityType: 'therapist',
    status: 'inactive',
    background: 'bg-gray-200',
    hoverBackground: 'hover:bg-gray-400',
    text: 'Inactif',
  },
  {
    entityType: 'patient',
    status: 'active',
    background: 'bg-green-300',
    hoverBackground: 'hover:bg-green-500',
    text: 'Actif',
  },
  {
    entityType: 'patient',
    status: 'inactive',
    background: 'bg-gray-200',
    hoverBackground: 'hover:bg-gray-400',
    text: 'Inactif',
  },
  {
    entityType: 'patient',
    status: 'pending',
    background: 'bg-yellow-300',
    hoverBackground: 'hover:bg-yellow-500',
    text: 'En attente',
  },
  {
    entityType: 'patient',
    status: 'banned',
    background: 'bg-red-300',
    hoverBackground: 'hover:bg-red-500',
    text: 'Banni',
  },
];
