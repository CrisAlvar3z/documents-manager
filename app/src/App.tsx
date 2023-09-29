import './App.css';
import AppRouter from './router';
import axios from 'axios';
import { API_BASE_URL } from './helpers/defaults';
axios.defaults.baseURL = API_BASE_URL

export default function App() {
  return (
    <>
      <AppRouter />
    </>  
  )
}
