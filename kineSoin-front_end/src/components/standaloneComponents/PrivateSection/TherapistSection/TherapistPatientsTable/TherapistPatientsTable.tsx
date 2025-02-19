import { useEffect, useState } from 'react';
import { ITherapistPatient } from '../../../../../@types/types';
import {
  fetchTherapist,
  fetchTherapistPatients,
} from '../../../../../utils/apiUtils';

export default function TherapistPatientsTable() {
  const windowWidth = window.innerWidth;

  const [therapistPatients, setTherapistPatients] = useState<
    ITherapistPatient[]
  >([]);

  const [noTherapistPatients, setNoTherapistPatients] =
    useState<boolean>(false);

  useEffect(() => {
    const handleGetTherapistPatients = async () => {
      try {
        const response = await fetchTherapistPatients();
        if (!response) {
          setNoTherapistPatients(true);
        } else {
          setTherapistPatients(response);
        }
      } catch (error) {
        console.error('Error fetching therapist patients: ', error);
      }
    };
    handleGetTherapistPatients();
  }, []);

  useEffect(() => {
    console.log(therapistPatients);
  }, [therapistPatients]);

  return (
    <table className="border-collapse border border-gray-300 w-full mx-auto md:w-11/12 md:my-auto mb-6 rounded-lg">
      <thead
        className={
          windowWidth < 450
            ? 'bg-gray-100 text-xs'
            : 'bg-gray-100 text-sm md:text-base'
        }
      >
        <tr>
          <>
            <th className="border border-gray-300 px-4 py-2 text-center">#</th>

            <th className="border border-gray-300 px-4 py-2 text-center">
              Nom patient
            </th>

            <th className="border border-gray-300 px-4 py-2 text-center">
              Statut
            </th>

            <th
              className="border border-gray-300 px-4 py-2 text-center"
              colSpan={2}
            >
              Action
            </th>
          </>
        </tr>
      </thead>

      <tbody className={windowWidth < 450 ? 'text-xxs' : 'text-xs md:text-sm'}>
        {noTherapistPatients && (
          <tr>
            <td
              className="border border-gray-300 px-4 py-2 text-center"
              colSpan={4}
            >
              Aucun patient trouvé
            </td>
          </tr>
        )}
        {/* {therapistPatients && therapistPatients.length > 0 && (
            therapistPatients.map((patient, index) => (
                <tr key={patient.id} className="odd:bg-white even:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 text-center">
                    {index + 1}
                </td>
                <td>
                    <p className="border border-gray-300 px-4 py-2 text-center">
                    {patient.fullName}
                    </p>
                </td>
        )} */}
      </tbody>
    </table>
  );
}
