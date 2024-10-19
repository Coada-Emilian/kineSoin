import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ITherapist } from '../../../../@types/ITherapist';

interface AdminTherapistPageProps {
  windowWidth: number;
}

const AdminTherapistPage = ({ windowWidth }: AdminTherapistPageProps) => {
  const { id } = useParams();
  console.log(id);
  const [therapist, setTherapist] = useState<ITherapist | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTherapist = async () => {
      try {
        const response = await axios.get(`/api/therapists/${id}`);
        setTherapist(response.data);
      } catch (error) {
        console.error('Error fetching therapist data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTherapist();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!therapist) {
    return <div>No therapist found.</div>;
  }

  return (
    <div>
      <h1>{therapist.name}</h1>
      {/* Add more therapist details as needed */}
    </div>
  );
};

export default AdminTherapistPage;
