import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import Modal from 'react-modal';
import App from './App.tsx';
import axios from './axios';
import './index.css';
import { getPatientTokenAndDataFromLocalStorage } from './localStorage/patientLocalStorage.ts';
import { getAdminTokenAndDataFromLocalStorage } from './localStorage/adminLocalStorage.ts';
import { getTherapistTokenAndDataFromLocalStorage } from './localStorage/therapistLocalStorage.ts';
import AdminNavBar from './components/NavBar/AdminNavBAr.tsx';

Modal.setAppElement('#root');

export default function Root() {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isPatientAuthenticated, setIsPAtientAuthenticated] = useState(false);
  const [isTherapistAuthenticated, setIsTherapistAuthenticated] =
    useState(false);
  const [patientProfileToken, setPatientProfileToken] = useState<string | null>(
    () => {
      const response = getPatientTokenAndDataFromLocalStorage();
      return response ? response.token : null;
    }
  );
  const [adminProfileToken, setAdminProfileToken] = useState<string | null>(
    () => {
      const response = getAdminTokenAndDataFromLocalStorage();
      return response ? response.token : null;
    }
  );
  const [therapistProfileToken, setTherapistProfileToken] = useState<
    string | null
  >(() => {
    const response = getTherapistTokenAndDataFromLocalStorage();
    return response ? response.token : null;
  });

  useEffect(() => {
    const checkAdminAuthentication = () => {
      const response = getAdminTokenAndDataFromLocalStorage();
      const token = response?.token;
      if (token && token === adminProfileToken) {
        setIsAdminAuthenticated(true);
        axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`;
      } else {
        setIsAdminAuthenticated(false);
        setAdminProfileToken(null);
        delete axios.defaults.headers.common.Authorization;
      }
    };
    checkAdminAuthentication();

    const handleAdminStorageChange = (event: StorageEvent) => {
      if (event.key === 'token') {
        checkAdminAuthentication();
      }
    };

    window.addEventListener('storage', handleAdminStorageChange);

    const intervalId = setInterval(checkAdminAuthentication, 5000);

    return () => {
      window.removeEventListener('storage', handleAdminStorageChange);
      clearInterval(intervalId);
    };
  }, [adminProfileToken, isAdminAuthenticated]);

  return (
    <BrowserRouter>
      <AdminNavBar isAdminAuthenticated={isAdminAuthenticated} />
      <App />
    </BrowserRouter>
  );
}

createRoot(document.getElementById('root')!).render(<Root />);
