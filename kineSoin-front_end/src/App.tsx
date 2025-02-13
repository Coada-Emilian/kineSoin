import { useEffect, useState } from 'react';
import axios from './axios';
import { getAdminTokenAndDataFromLocalStorage } from './localStorage/adminLocalStorage';
import { getPatientTokenAndDataFromLocalStorage } from './localStorage/patientLocalStorage';
import { getTherapistTokenAndDataFromLocalStorage } from './localStorage/therapistLocalStorage';
import { Outlet, Route, Routes } from 'react-router-dom';
import NavBar from './components/standaloneComponents/generalComponents/NavBar/NavBar';
import Footer from './components/standaloneComponents/generalComponents/Footer/Footer';
import ErrorPage from './components/pageComponents/ErrorPage/ErrorPage';
import MobileNav from './components/standaloneComponents/generalComponents/MobileNav/MobileNav';
import PatientPrescriptionPage from './components/pageComponents/PatientSection/PatientPrescriptionPage/PatientPrescriptionPage';
import PatientAppointmentsPage from './components/pageComponents/PatientSection/PatientAppointmentsPage/PatientAppointmentsPage';
import PatientMessagesPage from './components/pageComponents/PatientSection/PatientMessagesPage/PatientMessagesPage';
import PatientTherapistPage from './components/pageComponents/PatientSection/PatientTherapistPage/PatientTherapistPage';
import PatientDetailsPage from './components/pageComponents/PatientSection/PatientDetailsPage/PatientDetailsPage';
import HomepageMain from './components/pageComponents/PublicSection/HomepageMain';
import LoginPageMain from './components/pageComponents/PublicSection/LoginPageMain';
import RegisterPageMain from './components/pageComponents/PublicSection/RegisterPageMain';
import AdminLoginPage from './components/pageComponents/AdminSection/AdminLoginPage';
import AdminTherapistsPageMain from './components/pageComponents/AdminSection/Mains/AdminTherapistsPageMain';
import AdminTherapistPageMain from './components/pageComponents/AdminSection/Mains/AdminTherapistPageMain';
import AdminPatientsPageMain from './components/pageComponents/AdminSection/Mains/AdminPatientsPageMain';
import AdminPatientPageMain from './components/pageComponents/AdminSection/Mains/AdminPatientPageMain';
import AdminAfflictionsPageMain from './components/pageComponents/AdminSection/Mains/AdminAfflictionsPageMain';
import AdminAfflictionPageMain from './components/pageComponents/AdminSection/Mains/AdminAfflictionPageMain';
import AdminMedicsPageMain from './components/pageComponents/AdminSection/Mains/AdminMedicsPageMain';
import AdminMedicPageMain from './components/pageComponents/AdminSection/Mains/AdminMedicPageMain';
import AdminInsurancesPageMain from './components/pageComponents/AdminSection/Mains/AdminInsurancesMain';
import AdminInsurancePageMain from './components/pageComponents/AdminSection/Mains/AdminInsurancePageMain';
import PatientDashboardPageMain from './components/pageComponents/PatientSection/PatientDashboardPageMain';

interface PublicLayoutProps {
  windowWidth: number;
  setIsFirstFormValidated: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSecondFormValidated: React.Dispatch<React.SetStateAction<boolean>>;
  setIsThirdFormValidated: React.Dispatch<React.SetStateAction<boolean>>;
  setIsRegisterPageRendered: React.Dispatch<React.SetStateAction<boolean>>;
}

interface AdminLayoutProps {
  isAdminAuthenticated: boolean;
  setIsAdminAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  windowWidth: number;
}

interface PatientLayoutProps {
  isPatientAuthenticated: boolean;
  setIsPatientAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  windowWidth: number;
}

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

  const [isRegisterPageRendered, setIsRegisterPageRendered] =
    useState<boolean>(false);
  const [isFirstFormValidated, setIsFirstFormValidated] =
    useState<boolean>(false);
  const [isSecondFormValidated, setIsSecondFormValidated] =
    useState<boolean>(false);
  const [isThirdFormValidated, setIsThirdFormValidated] =
    useState<boolean>(false);
  const [isGlobalFormSubmitted, setIsGlobalFormSubmitted] =
    useState<boolean>(false);

  // useEffect to check if the admin is authenticated
  useEffect(() => {
    // Check if the admin is authenticated
    const checkAdminAuthentication = () => {
      const response = getAdminTokenAndDataFromLocalStorage();
      const token = response?.token;
      if (token && token === adminProfileToken) {
        setIsAdminAuthenticated(true);
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
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
    const intervalId = setInterval(checkAdminAuthentication, 2000);

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
    const intervalId = setInterval(checkPatientAuthentication, 2000);

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

      <Route
        path="/public"
        element={
          <PublicLayout
            windowWidth={windowWidth}
            setIsFirstFormValidated={setIsFirstFormValidated}
            setIsSecondFormValidated={setIsSecondFormValidated}
            setIsThirdFormValidated={setIsThirdFormValidated}
            setIsRegisterPageRendered={setIsRegisterPageRendered}
          />
        }
      >
        <Route path="home" element={<HomepageMain />}></Route>

        <Route
          path="loginPatient"
          element={
            <LoginPageMain
              isPatientLoginMain
              setPatientProfileToken={setPatientProfileToken}
            />
          }
        ></Route>

        <Route
          path="loginTherapist"
          element={
            <LoginPageMain
              isTherapistLoginMain
              setTherapistProfileToken={setTherapistProfileToken}
            />
          }
        ></Route>

        <Route
          path="registerPatient"
          element={
            <RegisterPageMain
              isFirstFormValidated={isFirstFormValidated}
              isSecondFormValidated={isSecondFormValidated}
              isThirdFormValidated={isThirdFormValidated}
              setIsFirstFormValidated={setIsFirstFormValidated}
              setIsSecondFormValidated={setIsSecondFormValidated}
              setIsThirdFormValidated={setIsThirdFormValidated}
              setIsGlobalFormSubmitted={setIsGlobalFormSubmitted}
              isGlobalFormSubmitted={isGlobalFormSubmitted}
            />
          }
        ></Route>
        <Route path="*" element={<ErrorPage isPublicErrorPage />} />
      </Route>

      <Route
        path="/loginAdmin"
        element={<AdminLoginPage setAdminProfileToken={setAdminProfileToken} />}
      />

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
            element={<AdminTherapistsPageMain windowWidth={windowWidth} />}
          />
          <Route
            path="therapists/:id"
            element={<AdminTherapistPageMain windowWidth={windowWidth} />}
          />
          <Route
            path="patients"
            element={<AdminPatientsPageMain windowWidth={windowWidth} />}
          />
          <Route
            path="patients/:id"
            element={<AdminPatientPageMain windowWidth={windowWidth} />}
          />
          <Route
            path="afflictions"
            element={<AdminAfflictionsPageMain windowWidth={windowWidth} />}
          />
          <Route
            path="afflictions/:id"
            element={<AdminAfflictionPageMain windowWidth={windowWidth} />}
          />
          <Route
            path="medics"
            element={<AdminMedicsPageMain windowWidth={windowWidth} />}
          />
          <Route
            path="medics/:id"
            element={<AdminMedicPageMain windowWidth={windowWidth} />}
          />
          <Route
            path="insurances"
            element={<AdminInsurancesPageMain windowWidth={windowWidth} />}
          />
          <Route
            path="insurances/:id"
            element={<AdminInsurancePageMain windowWidth={windowWidth} />}
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
        ></Route>
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
        >
          <Route
            path="dashboard"
            element={<PatientDashboardPageMain windowWidth={windowWidth} />}
          />
          <Route
            path="new-prescription"
            element={<PatientPrescriptionPage windowWidth={windowWidth} />}
          ></Route>
          <Route
            path="appointments"
            element={<PatientAppointmentsPage windowWidth={windowWidth} />}
          />
          <Route
            path="messages"
            element={<PatientMessagesPage windowWidth={windowWidth} />}
          />
          <Route
            path="my-therapist"
            element={<PatientTherapistPage windowWidth={windowWidth} />}
          />
          <Route
            path="my-info"
            element={<PatientDetailsPage windowWidth={windowWidth} />}
          />
        </Route>
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

function PublicLayout({
  windowWidth,
  setIsFirstFormValidated,
  setIsSecondFormValidated,
  setIsThirdFormValidated,
  setIsRegisterPageRendered,
}: PublicLayoutProps) {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <NavBar
        isPublicNavBar
        windowWidth={windowWidth}
        setIsFirstFormValidated={setIsFirstFormValidated}
        setIsSecondFormValidated={setIsSecondFormValidated}
        setIsThirdFormValidated={setIsThirdFormValidated}
        setIsRegisterPageRendered={setIsRegisterPageRendered}
      />
      <Outlet />
      <Footer isPublicFooter />

      {windowWidth < 768 && <MobileNav isPublicMobileNav />}
    </div>
  );
}

function AdminLayout({
  isAdminAuthenticated,
  setIsAdminAuthenticated,
  windowWidth,
}: AdminLayoutProps) {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <NavBar
        isAdminAuthenticated={isAdminAuthenticated}
        setIsAdminAuthenticated={setIsAdminAuthenticated}
        windowWidth={windowWidth}
        isAdminNavBar
      />
      <Outlet />
      <Footer isAdminFooter />

      {windowWidth < 768 && <MobileNav isAdminMobileNav />}
    </div>
  );
}

function PatientLayout({
  setIsPatientAuthenticated,
  isPatientAuthenticated,
  windowWidth,
}: PatientLayoutProps) {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <NavBar
        windowWidth={windowWidth}
        setIsPatientAuthenticated={setIsPatientAuthenticated}
        isPatientAuthenticated={isPatientAuthenticated}
        isPatientNavBar
      />
      <Outlet />
      <Footer isPatientFooter />

      {windowWidth < 768 && <MobileNav isPatientMobileNav />}
    </div>
  );
}

export default App;
