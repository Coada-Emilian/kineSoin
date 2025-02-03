// Function that saves token in localStorage
export const setTherapistTokenAndDataInLocalStorage = (
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
export const getTherapistTokenAndDataFromLocalStorage = () => {
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
export const updateTherapistDataInLocalStorage = (
  newPictureUrl: string,
  newName: string
) => {
  try {
    if (newName) {
      localStorage.setItem('name', newName);
    }
    if (newPictureUrl) {
      localStorage.setItem('picture_url', newPictureUrl);
    }
  } catch (error) {
    console.error('Error updating items in localStorage:', error);
  }
};

// Function to delete token when disconnecting
export const removeTherapistTokenFromLocalStorage = () => {
  try {
    localStorage.removeItem('token');
    localStorage.removeItem('fullName');
    localStorage.removeItem('picture_url');
    localStorage.removeItem('id');
  } catch (error) {
    console.error('Error removing items from localStorage:', error);
  }
};

// export const updateTherapistNameInLocalStorage = (newName: string) => {
//   if (newName) {
//     localStorage.setItem('name', newName);
//   }
// };
