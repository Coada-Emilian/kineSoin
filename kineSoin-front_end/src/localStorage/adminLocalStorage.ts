// Function that saves token in localStorage
export const setAdminTokenAndDataInLocalStorage = (
  token: string,
  name: string,
  id: string
) => {
  localStorage.setItem('token', token);
  localStorage.setItem('name', name);
  localStorage.setItem('id', id);
};

// Function that recuperates the token from localStorage
export const getAdminTokenAndDataFromLocalStorage = () => {
  const token = localStorage.getItem('token');
  const name = localStorage.getItem('name');
  const id = localStorage.getItem('id');

  // If no token present send null
  if (!token) {
    return null;
  }

  // Else send data
  return { token, name, id };
};

export const updateTherapistDataInLocalStorage = (newName: string) => {
  if (newName) {
    localStorage.setItem('name', newName);
  }
};

// Function to delete token when disconnecting
export const removeAdminTokenFromLocalStorage = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('name');
  localStorage.removeItem('id');
};
