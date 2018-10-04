import Config from 'react-native-config';
import axios from 'axios';

const { API_URL } = Config;

const getPersons = async () => {
  const response = await axios.get(`${API_URL}/person`);
  return response.data;
};

export default {
  getPersons
};
