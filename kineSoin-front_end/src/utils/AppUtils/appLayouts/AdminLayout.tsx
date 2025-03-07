import { Outlet } from 'react-router-dom';
import AdminNavBar from '../../../components/standaloneComponents/generalComponents/NavBar/AdminNavBar';
import AdminFooter from '../../../components/standaloneComponents/generalComponents/Footer/AdminFooter';
import AdminMobileNav from '../../../components/standaloneComponents/generalComponents/MobileNav/AdminMobileNav';

export function AdminLayout() {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <AdminNavBar />

      <Outlet />

      <AdminFooter />

      <AdminMobileNav />
    </div>
  );
}
