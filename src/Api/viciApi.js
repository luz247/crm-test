import axios from 'axios';
import { getEnvVariables } from '../helpers/getEnvVariables';

const { VITE_VICI } = getEnvVariables();

const viciApi = axios.create({
  baseURL: VITE_VICI,
});

export default viciApi;
