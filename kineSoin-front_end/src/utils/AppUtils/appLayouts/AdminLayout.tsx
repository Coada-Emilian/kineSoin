import NavBar from '../../../components/standaloneComponents/generalComponents/NavBar/NavBar';
import { Outlet } from 'react-router-dom';
import Footer from '../../../components/standaloneComponents/generalComponents/Footer/Footer';
import MobileNav from '../../../components/standaloneComponents/generalComponents/MobileNav/MobileNav';

export function AdminLayout() {
  // const navBarProps = {
  //   ...(isPublicLayout && {
  //     isPublicNavBar: true,
  //     setIsFirstFormValidated,
  //     setIsSecondFormValidated,
  //     setIsThirdFormValidated,
  //     setIsRegisterPageRendered,
  //   }),
  //   ...(isAdminLayout && {
  //     isAdminNavBar: true,
  //     isAdminAuthenticated,
  //     setIsAdminAuthenticated,
  //     setAdminProfileToken,
  //   }),
  //   ...(isPatientLayout && {
  //     isPatientNavBar: true,
  //     isPatientAuthenticated,
  //     setIsPatientAuthenticated,
  //   }),
  //   ...(isTherapistLayout && {
  //     isTherapistNavBar: true,
  //     isTherapistAuthenticated,
  //     setIsTherapistAuthenticated,
  //   }),
  // };

  // const footerProps = {
  //   ...(isAdminLayout && { isAdminFooter: true }),
  // };

  // const mobileNavProps = {
  //   ...(isPublicLayout && { isPublicMobileNav: true }),
  //   ...(isAdminLayout && { isAdminMobileNav: true }),
  //   ...(isPatientLayout && { isPatientMobileNav: true }),
  //   ...(isTherapistLayout && { isTherapistMobileNav: true }),
  // };

  return (
    <div className="flex flex-col justify-between min-h-screen">
      <NavBar />

      <Outlet />

      <Footer />

      <MobileNav/>
    </div>
  );
}
