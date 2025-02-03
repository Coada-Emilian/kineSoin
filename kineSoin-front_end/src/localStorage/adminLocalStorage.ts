// Function that saves token in localStorage
export const setAdminTokenAndDataInLocalStorage = (
  token: string,
  name: string,
  id: string
) => {
  try {
    localStorage.setItem('token', token);
    localStorage.setItem('name', name);
    localStorage.setItem('id', id);
  } catch (error) {
    console.error('Error setting items in localStorage:', error);
  }
};

// Function that recuperates the token from localStorage
export const getAdminTokenAndDataFromLocalStorage = () => {
  try {
    const token = localStorage.getItem('token');
    const name = localStorage.getItem('name');
    const id = localStorage.getItem('id');

    // If no token present send null
    if (!token) {
      return null;
    }

    // Else send data
    return { token, name, id };
  } catch (error) {
    console.error('Error getting items from localStorage:', error);
  }
};

// Function to delete token when disconnecting
export const removeAdminTokenFromLocalStorage = () => {
  try {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('id');
  } catch (error) {
    console.error('Error removing items from localStorage:', error);
  }
};
