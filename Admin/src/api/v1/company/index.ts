import axios from 'axios';

const backendBaseUrl = 'http://localhost:3000'; 
export const getPendingCompanies = async () => {
  try {
    const response = await axios.get(`${backendBaseUrl}/company/pending`);
    return response.data;
  } catch (error) {
    console.error('Error fetching pending companies:', error);
    throw error;
  }
};
