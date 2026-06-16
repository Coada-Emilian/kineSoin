interface FunctionProps {
  setButtonMessage: React.Dispatch<React.SetStateAction<string>>;
  setBackgroundColor: React.Dispatch<React.SetStateAction<string>>;
  setEntityStatus: React.Dispatch<React.SetStateAction<string>>;
}

export const toggleStatusRefactor = (
  status: string,
  { setEntityStatus }: FunctionProps
) => {
  if (status === 'active' || status === 'opérée') {
    if (status === 'active') {
      setButtonMessage('Active');
      setEntityStatus('active');
    } else if (status === 'opérée') {
      setButtonMessage('Opérée');
    }
    setBackgroundColor('bg-green-300 hover:bg-green-500');
  } else if (status === 'inactive' || status === 'non-opérée') {
    if (status === 'inactive') {
      setButtonMessage('Inactive');
      setEntityStatus('inactive');
    } else if (status === 'non-opérée') {
      setButtonMessage('Non-opérée');
    }
    setBackgroundColor('bg-gray-200 hover:bg-gray-400');
  } else if (status === 'pending') {
    setButtonMessage('Pending');
    setBackgroundColor('bg-yellow-300 hover:bg-yellow-500');
  } else if (status === 'banned') {
    setButtonMessage('Banned');
    setBackgroundColor('bg-red-300 hover:bg-red-500');
  }
};
