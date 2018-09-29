import Config from 'react-native-config';
import axios from 'axios';

const { API_URL } = Config;

const getPersons = () => axios.get(`${API_URL}/person`);

export default {
  getPersons
};
