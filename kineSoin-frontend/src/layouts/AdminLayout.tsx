import { Outlet } from 'react-router-dom';
import AdminFooter from '../components/layouts/footers/AdminFooter';
import AdminMobileNav from '../components/layouts/mobileNavbars/AdminMobileNavbar';
import AdminNavBar from '../components/layouts/navbars/AdminNavbar';

export function AdminLayout() {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <AdminNavBar />

      <main className="flex-1 flex items-center justify-center w-full bg-gray-100">
        <div className="flex w-full h-full p-4">
          <Outlet />
        </div>
      </main>

      <AdminFooter />

      <AdminMobileNav />
    </div>
  );
}
