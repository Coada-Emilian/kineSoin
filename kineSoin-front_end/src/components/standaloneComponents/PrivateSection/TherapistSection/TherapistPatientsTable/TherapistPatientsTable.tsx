import { useEffect, useState } from 'react';
import { ITherapistPatient } from '../../../../../@types/types';
import {
  fetchTherapistPatients,
  togglePatientStatusAsTherapist,
} from '../../../../../utils/apiUtils';
import deleteIcon from '/icons/delete.png';
import editIcon from '/icons/edit.png';
import refreshIcon from '/icons/refresh.png';
import { Link } from 'react-router-dom';

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

  const handlePatientStatusChange = async (id: number) => {
    try {
      const response = await togglePatientStatusAsTherapist(id);
      if (response) {
        console.log('Status changed successfully');
        window.location.reload();
      } else {
        console.error('Error changing patient status', response);
      }
    } catch (error) {
      console.error('Error changing status: ', error);
    }
  };

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
            <th className="border border-gray-300 px-4 py-2 text-">#</th>

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

        {therapistPatients &&
          therapistPatients.length > 0 &&
          therapistPatients.map((patient, index) => (
            <tr key={patient.id} className="odd:bg-white even:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2 text-center">
                {index + 1}
              </td>

              <td className="border border-gray-300 px-4 py-2 text-center">
                {patient.fullName}
              </td>

              <td
                className={`border border-gray-300 ${
                  patient.status === 'active'
                    ? 'bg-green-300'
                    : patient.status === 'pending'
                      ? 'bg-yellow-300'
                      : patient.status === 'banned'
                        ? 'bg-red-300'
                        : 'bg-gray-200'
                } px-4 py-2 text-center flex gap-1 items-center justify-center`}
              >
                {(patient.status === 'active' ||
                  patient.status === 'inactive') && (
                  <Link to="#" className="hidden md:block">
                    <img
                      src={refreshIcon}
                      alt="change status"
                      className="max-w-6"
                      onClick={() => handlePatientStatusChange(patient.id)}
                    />
                  </Link>
                )}

                <p>
                  {patient.status === 'active'
                    ? 'ACTIF'
                    : patient.status === 'inactive'
                      ? 'INACTIF'
                      : patient.status === 'banned'
                        ? 'BANNI'
                        : 'EN ATTENTE'}
                </p>
              </td>

              <td className="border border-gray-300 px-4 py-2 text-center">
                {windowWidth < 768 ? (
                  <Link to={`/admin/patients/${patient.id}`}>
                    <img
                      src={editIcon}
                      alt="edit"
                      className={
                        windowWidth < 450 ? 'w-10 mx-auto' : 'w-5 mx-auto'
                      }
                    />
                  </Link>
                ) : (
                  <Link
                    to={`/therapist/patients/${patient.id}`}
                    className="w-25 flex items-center justify-center"
                  >
                    <img src={editIcon} alt="edit" className="w-5 h-5 mx-1" />{' '}
                    <p className="text-blue-300 font-semibold">Inspecter</p>
                  </Link>
                )}
              </td>

              <td className="border border-gray-300 px-4 py-2 text-center">
                {windowWidth < 768 ? (
                  <Link
                    to="#"
                    className="w-12"
                    onClick={() => {
                      openDeleteModal(undefined, patient, undefined, undefined);
                    }}
                  >
                    <img
                      src={deleteIcon}
                      alt="delete"
                      className={
                        windowWidth < 450 ? 'w-10 mx-auto' : 'w-5 mx-auto'
                      }
                    />
                  </Link>
                ) : (
                  <Link
                    to="#"
                    className="w-25 flex justify-center items-center"
                    onClick={() => {
                      openDeleteModal(undefined, patient, undefined, undefined);
                    }}
                  >
                    <img
                      src={deleteIcon}
                      alt="supprimer"
                      className="w-5 mx-1"
                    />
                    <p className="text-red-600 font-semibold">Supprimer</p>
                  </Link>
                )}
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}
