import axios from 'axios';

export const getTicketsByEmployer = async (employerId, token) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/tickets/employer/${employerId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response,token,employerId)
    return response.data;
  } catch (error) {
    console.error('Error fetching tickets:', error);
    throw error;
  }
};
