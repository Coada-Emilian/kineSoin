// interface ItemDetailsProps {
//   handleTherapistStatusChange: UseMutationResult<
//     boolean,
//     Error,
//     {
//       id: number;
//       status: string;
//     },
//     unknown
//   >;

//   handlePatientStatusChange: UseMutationResult<
//     boolean,
//     Error,
//     {
//       id: number;
//       status: string;
//     },
//     unknown
//   >;
// }

export const getStatusButtonsItemDetails = () => [
  {
    entityType: 'therapist',
    // function: handleTherapistStatusChange,
    status: 'active',
    background: 'bg-green-300',
    hoverBackground: 'hover:bg-green-500',
    text: 'Actif',
  },
  {
    entityType: 'therapist',
    // function: handleTherapistStatusChange,
    status: 'inactive',
    background: 'bg-gray-200',
    hoverBackground: 'hover:bg-gray-400',
    text: 'Inactif',
  },
  {
    entityType: 'patient',
    // function: handlePatientStatusChange,
    status: 'active',
    background: 'bg-green-300',
    hoverBackground: 'hover:bg-green-500',
    text: 'Actif',
  },
  {
    entityType: 'patient',
    // function: handlePatientStatusChange,
    status: 'inactive',
    background: 'bg-gray-200',
    hoverBackground: 'hover:bg-gray-400',
    text: 'Inactif',
  },
  {
    entityType: 'patient',
    // function: handlePatientStatusChange,
    status: 'pending',
    background: 'bg-yellow-300',
    hoverBackground: 'hover:bg-yellow-500',
    text: 'En attente',
  },
  {
    entityType: 'patient',
    // function: handlePatientStatusChange,
    status: 'banned',
    background: 'bg-red-300',
    hoverBackground: 'hover:bg-red-500',
    text: 'Banni',
  },
];
