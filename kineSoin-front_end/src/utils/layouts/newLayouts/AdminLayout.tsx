import { Outlet } from 'react-router-dom';
import AdminFooter from '../../../components/standaloneComponents/generalComponents/layoutComponents/footer/AdminFooter';
import AdminMobileNav from '../../../components/standaloneComponents/generalComponents/layoutComponents/mobileNav/newComponents/AdminMobileNav';
import AdminNavBar from '../../../components/standaloneComponents/generalComponents/layoutComponents/navBar/newComponents/AdminNavBar';

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
