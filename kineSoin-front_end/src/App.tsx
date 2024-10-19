import { useEffect, useState } from 'react';
import axios from './axios';
import { getAdminTokenAndDataFromLocalStorage } from './localStorage/adminLocalStorage';
import { getPatientTokenAndDataFromLocalStorage } from './localStorage/patientLocalStorage';
import { getTherapistTokenAndDataFromLocalStorage } from './localStorage/therapistLocalStorage';
import { Outlet, Route, Routes } from 'react-router-dom';
import AdminLogin from './components/pageComponents/AdminSection/AdminLoginPage/AdminLogin';
import AdminNavBar from './components/pageComponents/standaloneComponents/AdminNavBar/AdminNavBar';
import AdminTherapistsPage from './components/pageComponents/AdminSection/AdminTherapisitsPage/AdminTherapistsPage';

function App() {
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
    <>
      <Routes>
        <Route
          path="/admin"
          element={<AdminLogin setAdminProfileToken={setAdminProfileToken} />}
        />
        {isAdminAuthenticated && (
          <Route
            path="/admin"
            element={
              <AdminLayout isAdminAuthenticated={isAdminAuthenticated} />
            }
          >
            <Route path="therapists" element={<AdminTherapistsPage />} />
          </Route>
        )}
      </Routes>
    </>
  );
}

function AdminLayout({
  isAdminAuthenticated,
}: {
  isAdminAuthenticated: boolean;
}) {
  return (
    <>
      <AdminNavBar />
      <Outlet />
    </>
  );
}

export default App;
