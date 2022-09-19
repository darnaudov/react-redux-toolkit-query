import axios from 'axios';

export const serverBaseUrl = 'http://localhost:5000';

export default axios.create({
  baseURL: serverBaseUrl,
});
