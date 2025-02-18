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
import PatientPrescriptionPageMain from './components/pageComponents/PatientSection/PatientPrescriptionPageMain';
import PatientAppointmentsPageMain from './components/pageComponents/PatientSection/PatientAppointmentsPageMain';
import PatientTherapistPageMain from './components/pageComponents/PatientSection/PatientTherapistPageMain';
import PatientMessagesPageMain from './components/pageComponents/PatientSection/PatientMessagesPageMain';
import PatientDetailsPageMain from './components/pageComponents/PatientSection/PatientDetailsPageMain';

interface LayoutProps {
  windowWidth: number;
  setIsFirstFormValidated?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSecondFormValidated?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsThirdFormValidated?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsRegisterPageRendered?: React.Dispatch<React.SetStateAction<boolean>>;

  isAdminAuthenticated?: boolean;
  setIsAdminAuthenticated?: React.Dispatch<React.SetStateAction<boolean>>;

  isPatientAuthenticated?: boolean;
  setIsPatientAuthenticated?: React.Dispatch<React.SetStateAction<boolean>>;

  isTherapistAuthenticated?: boolean;
  setIsTherapistAuthenticated?: React.Dispatch<React.SetStateAction<boolean>>;
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

  useEffect(() => {}, []);

  // useEffect to check if the admin is authenticated
  useEffect(() => {
    // Check if the admin is authenticated
    const checkAdminAuthentication = () => {
      const response = getAdminTokenAndDataFromLocalStorage();
      const token = response?.token;
      if (token && token === response?.token) {
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
    const intervalId = setInterval(checkAdminAuthentication, 30000);

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

      // Make sure to set token in axios only if it's available and valid
      if (token && token === response?.token) {
        setIsPatientAuthenticated(true);
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      } else {
        setIsPatientAuthenticated(false);
        setPatientProfileToken(null);
        delete axios.defaults.headers.common.Authorization;
      }
    };

    checkPatientAuthentication();

    // Listen for changes in localStorage
    const handlePatientStorageChange = (event: StorageEvent) => {
      if (event.key === 'token') {
        checkPatientAuthentication();
      }
    };

    // Add event listener for storage change
    window.addEventListener('storage', handlePatientStorageChange);

    // Check every 30 seconds if the patient is authenticated
    const intervalId = setInterval(checkPatientAuthentication, 30000);

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
      if (token && token === response?.token) {
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
    const intervalId = setInterval(checkTherapistAuthentication, 30000);

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
          <Route path="*" element={<ErrorPage isConnectedAdminErrorPage />} />
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
          <Route path="*" element={<ErrorPage isUnconnectedAdminErrorPage />} />
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
        >
          <Route
            path="dashboard"
            element={<PatientDashboardPageMain windowWidth={windowWidth} />}
          />
          <Route
            path="new-prescription"
            element={<PatientPrescriptionPageMain windowWidth={windowWidth} />}
          ></Route>
          <Route
            path="appointments"
            element={<PatientAppointmentsPageMain windowWidth={windowWidth} />}
          />
          <Route
            path="messages"
            element={<PatientMessagesPageMain windowWidth={windowWidth} />}
          />
          <Route
            path="my-therapist"
            element={<PatientTherapistPageMain windowWidth={windowWidth} />}
          />
          <Route
            path="my-info"
            element={<PatientDetailsPageMain windowWidth={windowWidth} />}
          />
          <Route path="*" element={<ErrorPage isConnectedPatientErrorPage />} />
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
          <Route
            path="*"
            element={<ErrorPage isUnconnectedPatientErrorPage />}
          />
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
}: LayoutProps) {
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
}: LayoutProps) {
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
}: LayoutProps) {
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

function TherapistLayout({
  setIsTherapistAuthenticated
  isTherapistAuthenticated, windowWidth,
}: LayoutProps) {
  return(
    <div className="flex flex-col justify-between min-h-screen">
      <NavBar
        windowWidth={windowWidth}
        setIsTherapistAuthenticated={setIsTherapistAuthenticated}
        isTherapistAuthenticated={isTherapistAuthenticated}
        isTherapistNavBar
      />
      <Outlet />
      <Footer isTherapistFooter />

      {windowWidth < 768 && <MobileNav isTherapistMobileNav />}
    </div>
  )
}

export default App;
