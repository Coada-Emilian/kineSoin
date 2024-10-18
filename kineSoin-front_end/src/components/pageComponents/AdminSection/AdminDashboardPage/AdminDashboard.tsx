import AdminSideNav from '../../standaloneComponents/AdminSideNav/AdminSideNav';
import AdminTable from '../../standaloneComponents/AdminTable/AdminTable';

export default function AdminDashboard() {
  return (
    <main className="w-full flex">
      <div className="w-1/4">
        <AdminSideNav />
      </div>
      <div className="w-3/4">
        {' '}
        <AdminTable />
      </div>
    </main>
  );
}
