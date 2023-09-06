// companyApi.ts
import axios from 'axios';

const backendBaseUrl = 'http://localhost:3000'; // Replace with your backend URL

export const getPendingCompanies = async () => {
  try {
    const response = await axios.get(`${backendBaseUrl}/company/pending`);
    console.log(response);
    return response.data;
  } catch (error) {
    // Handle error
    console.error('Error fetching pending companies:', error);
    throw error;
  }
};
