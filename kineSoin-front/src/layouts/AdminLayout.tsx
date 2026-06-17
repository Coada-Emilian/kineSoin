import { Outlet } from 'react-router-dom';
import AdminFooter from '../components/layouts/footers/AdminFooter';
import AdminMobileNav from '../components/layouts/mobileNavbars/AdminMobileNavbar';
import AdminNavBar from '../components/layouts/navbars/AdminNavbar';

export function AdminLayout() {
  return (
    <div className="flex flex-col min-h-screen justify-between">
      <AdminNavBar />

      <Outlet />

      <AdminFooter />

      <AdminMobileNav />
    </div>
  );
}
