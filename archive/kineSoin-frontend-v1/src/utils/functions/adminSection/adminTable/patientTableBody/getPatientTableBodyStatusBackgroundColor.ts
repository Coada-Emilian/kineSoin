export const getPatientTableBodyStatusBackgroundColor = (status: string) => {
  switch (status) {
    case 'active':
      return 'bg-green-300';
    case 'inactive':
      return 'bg-gray-200';
    case 'banned':
      return 'bg-red-300';
    case 'pending':
      return 'bg-yellow-300';
    default:
      return 'bg-gray-200';
  }
};
