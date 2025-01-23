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
import LoginPage from './components/pageComponents/PublicSection/LoginPage';

function App() {
  // Use state to keep track of the window width
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Make sure the windowWidth state always has the current window width
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  // useEffect to listen for window resize events
  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Authentication states
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isPatientAuthenticated, setIsPatientAuthenticated] = useState(false);
  const [isTherapistAuthenticated, setIsTherapistAuthenticated] =
    useState(false);

  // Tokens
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

  // useEffect to check if the admin is authenticated
  useEffect(() => {
    // Check if the admin is authenticated
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

    // Listen for changes in the local storage
    const handleAdminStorageChange = (event: StorageEvent) => {
      if (event.key === 'token') {
        checkAdminAuthentication();
      }
    };

    // Add event listener for storage change
    window.addEventListener('storage', handleAdminStorageChange);

    // Check every 5 seconds if the admin is authenticated
    const intervalId = setInterval(checkAdminAuthentication, 5000);

    // Cleanup
    return () => {
      window.removeEventListener('storage', handleAdminStorageChange);
      clearInterval(intervalId);
    };
  }, [adminProfileToken, isAdminAuthenticated]);

  // useEffect to check if the patient is authenticated
  useEffect(() => {
    // Check if the patient is authenticated
    const checkPatientAuthentication = () => {
      const response = getPatientTokenAndDataFromLocalStorage();
      const token = response?.token;
      if (token && token === patientProfileToken) {
        setIsPatientAuthenticated(true);
        axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`;
      } else {
        setIsPatientAuthenticated(false);
        setPatientProfileToken(null);
        delete axios.defaults.headers.common.Authorization;
      }
    };
    checkPatientAuthentication();

    // Listen for changes in the local storage
    const handlePatientStorageChange = (event: StorageEvent) => {
      if (event.key === 'token') {
        checkPatientAuthentication();
      }
    };

    // Add event listener for storage change
    window.addEventListener('storage', handlePatientStorageChange);

    // Check every 5 seconds if the patient is authenticated
    const intervalId = setInterval(checkPatientAuthentication, 5000);

    // Cleanup
    return () => {
      window.removeEventListener('storage', handlePatientStorageChange);
      clearInterval(intervalId);
    };
  }, [patientProfileToken, isPatientAuthenticated]);

  // useEffect to check if the therapist is authenticated
  useEffect(() => {
    // Check if the therapist is authenticated
    const checkTherapistAuthentication = () => {
      const response = getTherapistTokenAndDataFromLocalStorage();
      const token = response?.token;
      if (token && token === therapistProfileToken) {
        setIsTherapistAuthenticated(true);
        axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`;
      } else {
        setIsTherapistAuthenticated(false);
        setTherapistProfileToken(null);
        delete axios.defaults.headers.common.Authorization;
      }
    };
    checkTherapistAuthentication();

    // Listen for changes in the local storage
    const handleTherapistStorageChange = (event: StorageEvent) => {
      if (event.key === 'token') {
        checkTherapistAuthentication();
      }
    };

    // Add event listener for storage change
    window.addEventListener('storage', handleTherapistStorageChange);

    // Check every 5 seconds if the therapist is authenticated
    const intervalId = setInterval(checkTherapistAuthentication, 5000);

    // Cleanup
    return () => {
      window.removeEventListener('storage', handleTherapistStorageChange);
      clearInterval(intervalId);
    };
  }, [therapistProfileToken, isTherapistAuthenticated]);

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Homepage windowWidth={windowWidth} />}></Route>

      <Route
        path="/loginPatient"
        element={
          <LoginPage
            isPatientLoginPage
            windowWidth={windowWidth}
            setPatientProfileToken={setPatientProfileToken}
          />
        }
      ></Route>

      <Route
        path="/loginTherapist"
        element={
          <LoginPage
            isTherapistLoginPage
            windowWidth={windowWidth}
            setTherapistProfileToken={setTherapistProfileToken}
          />
        }
      ></Route>

      <Route
        path="/loginAdmin"
        element={<AdminLogin setAdminProfileToken={setAdminProfileToken} />}
      />

      <Route
        path="/registerPatient"
        element={<LoginPage isPatientRegisterPage windowWidth={windowWidth} />}
      ></Route>

      {/* Admin routes */}
      {isAdminAuthenticated ? (
        <Route
          path="/admin"
          element={
            <AdminLayout
              isAdminAuthenticated={isAdminAuthenticated}
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
      ) : (
        <Route
          path="/admin"
          element={
            <AdminLayout
              isAdminAuthenticated={isAdminAuthenticated}
              setIsAdminAuthenticated={setIsAdminAuthenticated}
              windowWidth={windowWidth}
            />
          }
        >
          <Route path="*" element={<ErrorPage />} />
        </Route>
      )}

      {/* Patient routes */}
      {isPatientAuthenticated ? (
        <Route
          path="/patient"
          element={
            <PatientLayout
              isPatientAuthenticated={isPatientAuthenticated}
              setIsPatientAuthenticated={setIsPatientAuthenticated}
              windowWidth={windowWidth}
            />
          }
        ></Route>
      ) : (
        <Route
          path="/patient"
          element={
            <PatientLayout
              isPatientAuthenticated={isPatientAuthenticated}
              setIsPatientAuthenticated={setIsPatientAuthenticated}
              windowWidth={windowWidth}
            />
          }
        >
          <Route path="*" element={<ErrorPage />} />
        </Route>
      )}
    </Routes>
  );
}

function AdminLayout({
  isAdminAuthenticated,
  setIsAdminAuthenticated,
  windowWidth,
}: {
  isAdminAuthenticated: boolean;
  setIsAdminAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  windowWidth: number;
}) {
  return (
    <>
      <NavBar
        isAdminAuthenticated={isAdminAuthenticated}
        setIsAdminAuthenticated={setIsAdminAuthenticated}
        windowWidth={windowWidth}
        isAdminNavBar
      />
      <Outlet />
      <Footer isAdminFooter />
    </>
  );
}

function PatientLayout({
  isPatientAuthenticated,
  setIsPatientAuthenticated,
  windowWidth,
}: {
  isPatientAuthenticated: boolean;
  setIsPatientAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  windowWidth: number;
}) {
  return (
    <>
      <NavBar
        windowWidth={windowWidth}
        isPatientAuthenticated={isPatientAuthenticated}
        setIsPatientAuthenticated={setIsPatientAuthenticated}
        isPatientNavBar
      />
      <Outlet />
      <Footer isPatientFooter/>
    </>
  );
}

export default App;
