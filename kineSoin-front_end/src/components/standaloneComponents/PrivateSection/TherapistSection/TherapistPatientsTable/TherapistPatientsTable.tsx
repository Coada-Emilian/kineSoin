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
import TherapistModal from '../Modals/TherapistModal';
import DNALoader from '../../../../../utils/DNALoader';

export default function TherapistPatientsTable() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    window.addEventListener('resize', () => {
      setWindowWidth(window.innerWidth);
    });
  }, [windowWidth]);

  const [therapistPatients, setTherapistPatients] = useState<
    ITherapistPatient[]
  >([]);

  const [noTherapistPatients, setNoTherapistPatients] =
    useState<boolean>(false);

  useEffect(() => {
    const handleGetTherapistPatients = async () => {
      setIsLoading(true);
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
    setIsLoading(false);
  }, []);

  const handlePatientStatusChange = async (id: number) => {
    setIsLoading(true);
    try {
      const response = await togglePatientStatusAsTherapist(id);
      if (response) {
        console.log('Status changed successfully');
        setIsLoading(false);
        window.location.reload();
      } else {
        console.error('Error changing patient status', response);
      }
    } catch (error) {
      console.error('Error changing status: ', error);
    }
  };

  const [isDeletePatientModalOpen, setIsDeletePatientModalOpen] =
    useState<boolean>(false);
  const [selectedPatient, setSelectedPatient] =
    useState<ITherapistPatient | null>(null);
  const [isPatientDetailsModalOpen, setIsPatientDetailsModalOpen] =
    useState<boolean>(false);

  return (
    <>
      {isLoading && (
        <div className="flex justify-center items-center h-96">
          <DNALoader />
        </div>
      )}
      <table className="border-collapse border border-gray-300 w-full mx-auto md:w-11/12  mb-6 rounded-lg shadow-xl">
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

        <tbody
          className={windowWidth < 450 ? 'text-xxs' : 'text-xs md:text-sm'}
        >
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
                        className="max-w-6 hover:animate-spin"
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

                <td className="border border-gray-300 px-4 py-2 text-center hover:transform hover:scale-125">
                  <Link
                    to="#"
                    className={`${windowWidth < 768 ? 'w-12' : 'w-25 flex justify-center items-center'}`}
                    onClick={() => {
                      setSelectedPatient(patient);
                      setIsPatientDetailsModalOpen(true);
                    }}
                  >
                    <img
                      src={editIcon}
                      alt="edit"
                      className={windowWidth < 768 ? 'w-5 mx-auto' : 'w-5 mx-1'}
                    />
                    {windowWidth > 768 && (
                      <p className="text-blue-300 font-semibold">Inspecter</p>
                    )}
                  </Link>
                </td>

                <td className="border border-gray-300 px-4 py-2 text-center hover:transform hover:scale-125">
                  <Link
                    to="#"
                    className={`${windowWidth < 768 ? 'w-12' : 'w-25 flex justify-center items-center'}`}
                    onClick={() => {
                      setSelectedPatient(patient);
                      setIsDeletePatientModalOpen(true);
                    }}
                  >
                    <img
                      src={deleteIcon}
                      alt="supprimer"
                      className={windowWidth < 768 ? 'w-5 mx-auto' : 'w-5 mx-1'}
                    />
                    {windowWidth > 768 && (
                      <p className="text-red-600 font-semibold">Supprimer</p>
                    )}
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {isDeletePatientModalOpen && (
        <TherapistModal
          isDeletePatientModal
          isDeletePatientModalOpen={isDeletePatientModalOpen}
          setIsDeletePatientModalOpen={setIsDeletePatientModalOpen}
          selected_patient={selectedPatient}
        />
      )}

      {isPatientDetailsModalOpen && (
        <TherapistModal
          selected_patient={selectedPatient}
          isPatientDetailsModal
          isPatientDetailsModalOpen={isPatientDetailsModalOpen}
          setIsPatientDetailsModalOpen={setIsPatientDetailsModalOpen}
        />
      )}
    </>
  );
}
