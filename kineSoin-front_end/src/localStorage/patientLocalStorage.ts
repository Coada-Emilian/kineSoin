// Function that saves token in localStorage
export const setPatientTokenAndDataInLocalStorage = (
  token: string,
  fullName: string,
  picture_url: string,
  id: string
) => {
  localStorage.setItem('token', token);
  localStorage.setItem('fullName', fullName);
  localStorage.setItem('picture_url', picture_url);
  localStorage.setItem('id', id);
};

// Function that recuperates the token from localStorage
export const getPatientTokenAndDataFromLocalStorage = () => {
  const token = localStorage.getItem('token');
  const fullName = localStorage.getItem('fullName');
  const picture_url = localStorage.getItem('picture_url');
  const id = localStorage.getItem('id');

  // If no token present send null
  if (!token) {
    return null;
  }

  // Else send data
  return { token, fullName, picture_url, id };
};

export const updatePatientDataInLocalStorage = (
  newPictureUrl: string,
  newName: string
) => {
  if (newName) {
    localStorage.setItem('name', newName);
  }
  if (newPictureUrl) {
    localStorage.setItem('picture_url', newPictureUrl);
  }
};

// Function to delete token when disconnecting
export const removePatientTokenFromLocalStorage = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('fullName');
  localStorage.removeItem('picture_url');
  localStorage.removeItem('id');
};
