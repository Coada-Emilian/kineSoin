import { useEffect, useState } from 'react';
import deleteIcon from '/icons/delete.png';
import editIcon from '/icons/edit.png';
import refreshIcon from '/icons/refresh.png';
import { Link } from 'react-router-dom';
import TherapistModal from '../Modals/TherapistModal';
import DNALoader from '../../../../../utils/DNALoader';
import {
  fetchTherapistPatients,
  togglePatientStatusAsTherapist,
} from '../../../../../utils/apiUtils/therapistApiUtils';
import { ITherapistPatient } from '../../../../../@types/customTypes';
import { Button } from '@headlessui/react';

export default function TherapistPatientsTable() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
      <table className="border-collapse border border-gray-300 w-11/12 mx-auto  mb-6 rounded-lg shadow-xl">
        <thead className="bg-gray-100 xxs:text-xs text-sm md:text-base">
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

        <tbody className="xxs:text-xxs text-xs md:text-sm">
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
                    <Button
                      className=" md:block"
                      onClick={() => handlePatientStatusChange(patient.id)}
                    >
                      <img
                        src={refreshIcon}
                        alt="change status"
                        className="max-w-4 md:max-w-6 hover:animate-spin"
                      />
                    </Button>
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
                  <Button
                    className="w-12 md:w-25 flex justify-center items-center"
                    onClick={() => {
                      setSelectedPatient(patient);
                      setIsPatientDetailsModalOpen(true);
                    }}
                  >
                    <img
                      src={editIcon}
                      alt="edit"
                      className="mx-auto w-5 md:mx-1"
                    />

                    <p className="text-blue-300 font-semibold hidden md:block">
                      Inspecter
                    </p>
                  </Button>
                </td>

                <td className="border border-gray-300 px-4 py-2 text-center hover:transform hover:scale-125">
                  <Button
                    className="w-12 md:w-25 flex justify-center items-center"
                    onClick={() => {
                      setSelectedPatient(patient);
                      setIsDeletePatientModalOpen(true);
                    }}
                  >
                    <img
                      src={deleteIcon}
                      alt="supprimer"
                      className="mx-auto w-5 md:mx-1"
                    />

                    <p className="text-red-600 font-semibold hidden md:block">
                      Supprimer
                    </p>
                  </Button>
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
