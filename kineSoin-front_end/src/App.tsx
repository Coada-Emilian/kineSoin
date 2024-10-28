import { useEffect, useState } from 'react';
import axios from './axios';
import { getAdminTokenAndDataFromLocalStorage } from './localStorage/adminLocalStorage';
import { getPatientTokenAndDataFromLocalStorage } from './localStorage/patientLocalStorage';
import { getTherapistTokenAndDataFromLocalStorage } from './localStorage/therapistLocalStorage';
import { Outlet, Route, Routes } from 'react-router-dom';
import AdminLogin from './components/pageComponents/AdminSection/AdminLoginPage/AdminLogin';
import NavBar from './components/pageComponents/standaloneComponents/NavBar/NavBar';
import AdminTherapistsPage from './components/pageComponents/AdminSection/AdminTherapists/AdminTherapistsPage/AdminTherapistsPage';
import Footer from './components/pageComponents/standaloneComponents/Footer/Footer';
import AdminTherapistPage from './components/pageComponents/AdminSection/AdminTherapists/AdminTherapistPage/AdminTherapistPage';
import ErrorPage from './components/pageComponents/AdminSection/ErrorPage/ErrorPage';
import AdminPatientsPage from './components/pageComponents/AdminSection/AdminPatients/AdminPatientsPage/AdminPatientsPage';
import AdminPatientPage from './components/pageComponents/AdminSection/AdminPatients/AdminPatientPage/AdminPatientPage';
import AdminAfflictionsPage from './components/pageComponents/AdminSection/AdminAfflictions/AdminAfflictionsPage/AdminAfflictionsPage';
import AdminAfflictionPage from './components/pageComponents/AdminSection/AdminAfflictions/AdminAfflictionPage/AdminAfflictionPage';
import AdminMedicsPage from './components/pageComponents/AdminSection/AdminMedics/AdminMedicsPage/AdminMedicsPage';
import AdminMedicPage from './components/pageComponents/AdminSection/AdminMedics/AdminMedicPage/AdminMedicPage';
import AdminInsurancesPage from './components/pageComponents/AdminSection/AdminInsurances/AdminInsurancesPage/AdminInsurancesPage';
import AdminInsurancePage from './components/pageComponents/AdminSection/AdminInsurances/AdminInsurancePage/AdminInsurancePage';
import Homepage from './components/pageComponents/PublicSection/Homepage';

function App() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    console.log('windowWidth', windowWidth);
  }, [windowWidth]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
    <Routes>
      <Route path="/" element={<Homepage windowWidth={windowWidth} />}></Route>
      <Route
        path="/loginAdmin"
        element={<AdminLogin setAdminProfileToken={setAdminProfileToken} />}
      />

      {isAdminAuthenticated && (
        <Route
          path="/admin"
          element={
            <AdminLayout
              setIsAdminAuthenticated={setIsAdminAuthenticated}
              windowWidth={windowWidth}
            />
          }
        >
          <Route
            path="therapists"
            element={<AdminTherapistsPage windowWidth={windowWidth} />}
          />
          <Route
            path="therapists/:id"
            element={<AdminTherapistPage windowWidth={windowWidth} />}
          />
          <Route
            path="patients"
            element={<AdminPatientsPage windowWidth={windowWidth} />}
          />
          <Route
            path="patients/:id"
            element={<AdminPatientPage windowWidth={windowWidth} />}
          />
          <Route
            path="afflictions"
            element={<AdminAfflictionsPage windowWidth={windowWidth} />}
          />
          <Route
            path="afflictions/:id"
            element={<AdminAfflictionPage windowWidth={windowWidth} />}
          />
          <Route
            path="medics"
            element={<AdminMedicsPage windowWidth={windowWidth} />}
          />
          <Route
            path="medics/:id"
            element={<AdminMedicPage windowWidth={windowWidth} />}
          />
          <Route
            path="insurances"
            element={<AdminInsurancesPage windowWidth={windowWidth} />}
          />
          <Route
            path="insurances/:id"
            element={<AdminInsurancePage windowWidth={windowWidth} />}
          />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      )}
    </Routes>
  );
}

function AdminLayout({
  setIsAdminAuthenticated,
  windowWidth,
}: {
  setIsAdminAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  windowWidth: number;
}) {
  return (
    <>
      <NavBar
        setIsAdminAuthenticated={setIsAdminAuthenticated}
        windowWidth={windowWidth}
        isAdminNavBar
      />
      <Outlet />
      <Footer isAdminFooter />
    </>
  );
}

export default App;
