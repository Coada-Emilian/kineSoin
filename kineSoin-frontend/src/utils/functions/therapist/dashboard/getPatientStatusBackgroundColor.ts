export const getPatientStatusBackgroundColor = (status: string) => {
  switch (status) {
    case 'active':
      return 'bg-green-300';
    case 'pending':
      return 'bg-yellow-300';
    case 'banned':
      return 'bg-red-300';
    default:
      return 'bg-gray-200';
  }
};
