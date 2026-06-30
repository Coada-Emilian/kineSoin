import axios from '../../../../axios.ts';

export const sendMessageToPatient = async (id: number, content: string) => {
  try {
    const response = await axios.post(
      `/therapist/me/patients/${id}/messages`,
      { content },
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
