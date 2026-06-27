// Function that saves token in localStorage
export const setAdminTokenAndDataInLocalStorage = (
  token: string,
  name: string,
  id: string
) => {
  try {
    localStorage.setItem('admin_token', token);
    localStorage.setItem('admin_name', name);
    localStorage.setItem('admin_id', id);
  } catch (error) {
    console.error('Error setting items in localStorage:', error);
  }
};

// Function that recuperates the token from localStorage
export const getAdminTokenAndDataFromLocalStorage = () => {
  try {
    const admin_token = localStorage.getItem('admin_token');
    const admin_name = localStorage.getItem('admin_name');
    const admin_id = localStorage.getItem('admin_id');

    // If no token present send null
    if (!admin_token) {
      return null;
    }

    // Else send data
    return { admin_token, admin_name, admin_id };
  } catch (error) {
    console.error('Error getting items from localStorage:', error);
  }
};

// Function to delete token when disconnecting
export const removeAdminTokenFromLocalStorage = () => {
  try {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_name');
    localStorage.removeItem('admin_id');
  } catch (error) {
    console.error('Error removing items from localStorage:', error);
  }
};
