// Function that saves token in localStorage
export const setPatientTokenAndDataInLocalStorage = (
  token: string,
  fullName: string,
  picture_url: string,
  id: string
) => {
  try {
    localStorage.setItem('token', token);
    localStorage.setItem('fullName', fullName);
    localStorage.setItem('picture_url', picture_url);
    localStorage.setItem('id', id);
  } catch (error) {
    console.error('Error setting items in localStorage:', error);
  }
};

// Function that recuperates the token from localStorage
export const getPatientTokenAndDataFromLocalStorage = () => {
  try {
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
  } catch (error) {
    console.error('Error getting items from localStorage:', error);
  }
};

// Function that updates patient data in localStorage
export const updatePatientDataInLocalStorage = (
  newPictureUrl: string,
  newName: string
) => {
  try {
    if (newName) {
      console.log('newName from updatePatientDataInLocalStorage', newName);
      localStorage.setItem('fullName', newName);
    }
    if (newPictureUrl) {
      console.log(
        'newPictureUrl from updatePatientDataInLocalStorage',
        newPictureUrl
      );
      localStorage.setItem('picture_url', newPictureUrl);
    }
  } catch (error) {
    console.error('Error updating items in localStorage:', error);
  }
};

// Function to delete token when disconnecting
export const removePatientTokenFromLocalStorage = () => {
  try {
    localStorage.removeItem('token');
    localStorage.removeItem('fullName');
    localStorage.removeItem('picture_url');
    localStorage.removeItem('id');
  } catch (error) {
    console.error('Error removing items from localStorage:', error);
  }
};
