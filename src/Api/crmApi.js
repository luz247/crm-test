import axios from 'axios'
import { getEnvVariables } from '../helpers/getEnvVariables'
const {VITE_API} = getEnvVariables()


 const crmApi = axios.create({
  baseURL:VITE_API
 })


 export default crmApi