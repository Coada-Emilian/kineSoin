import axios from '../../axios.ts';

export const fetchTherapistDashboardData = async () => {
  try {
    const response = await axios.get('/therapist/me/dashboard');
    if (response.status === 200) {
      return response.data;
    } else {
      console.error('Failed to fetch therapist dashboard data', response.data);
      return null;
    }
  } catch (error) {
    console.error('Error fetching therapist dashboard data:', error);
    return null;
  }
};

export const sendMessageToPatient = async (id: number, formData: FormData) => {
  try {
    const response = await axios.post(
      `/therapist/me/patients/${id}/messages`,
      formData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    if (response.status === 201) {
      console.log('Message sent successfully');
      return true;
    } else {
      console.error('Failed to send message', response.data);
      return false;
    }
  } catch (error) {
    console.error('Error sending message:', error);
    return false;
  }
};

export const cancelAppointment = async (id: number) => {
  try {
    const response = await axios.delete(`/therapist/me/appointments/${id}`);
    if (response.status === 200) {
      console.log('Appointment canceled successfully');
      return true;
    } else {
      console.error('Failed to cancel appointment', response.data);
      return false;
    }
  } catch (error) {
    console.error('Error canceling appointment:', error);
    return false;
  }
};

export const reducePrescriptionQuantity = async (id: number) => {
  try {
    const response = await axios.patch(
      `/therapist/me/prescriptions/${id}/reduceQuantity`
    );
    if (response.status === 200) {
      console.log('Prescription quantity reduced successfully');
      return true;
    } else {
      console.error('Failed to reduce prescription quantity', response.data);
      return false;
    }
  } catch (error) {
    console.error('Error reducing prescription quantity:', error);
    return false;
  }
};

export const fetchTherapistPatients = async () => {
  try {
    const response = await axios.get('/therapist/me/allMyPatients');
    if (response.status === 200) {
      return response.data;
    } else {
      console.error('Failed to fetch therapist patients', response.data);
      return [];
    }
  } catch (error) {
    console.error('Error fetching therapist patients:', error);
    return [];
  }
};

export const togglePatientStatusAsTherapist = async (id: number) => {
  try {
    const response = await axios.patch(
      `/therapist/me/patients/${id}/toggleStatus`
    );
    if (response.status === 200) {
      console.log('Patient status updated successfully');
      return true;
    } else {
      console.error('Failed to update patient status', response.data);
      return false;
    }
  } catch (error) {
    console.error('Error updating patient status:', error);
    return false;
  }
};

export const fetchPatientDataAsTherapist = async (id: number) => {
  try {
    const response = await axios.get(`/therapist/me/patients/${id}`);
    if (response.status === 200) {
      return response.data;
    } else {
      console.error('Failed to fetch patient data', response.data);
      return null;
    }
  } catch (error) {
    console.error('Error fetching patient data:', error);
    return null;
  }
};
