import AdminSideNav from '../../standaloneComponents/AdminSideNav/AdminSideNav.tsx';
import AdminTable from '../../standaloneComponents/AdminTable/AdminTable.tsx';
import axios from '../../../../axios.ts';
import { useEffect, useState } from 'react';

export default function AdminTherapistsPage() {
  const [allTherapists, setAllTherapists] = useState([]);

  useEffect(() => {
    const fetchTherapists = async () => {
      const allTherapists = await axios.get('/admin/therapists');
      setAllTherapists(allTherapists.data);
    };
    fetchTherapists();
  }, []);

  return (
    <main className="w-full flex">
      {/* <div className="w-1/4">
        <AdminSideNav />
      </div>
      <div className="w-3/4">
        {' '}
        <AdminTable allTherapists={allTherapists} />
      </div> */}
    </main>
  );
}
