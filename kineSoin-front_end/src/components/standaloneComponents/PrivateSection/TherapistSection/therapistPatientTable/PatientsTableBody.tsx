import { Button } from '@headlessui/react';
import { IUserProfile } from '../../../../../@types/interfaces/customInterfaces';
import DNALoader from '../../../../../utils/DNALoader';
import { useTogglePatientStatusAsTherapistMutation } from '../../../../../utils/functions/privateSection/therapistSection/mutations/useTogglePatientStatusAsTherapistMutation';
import deleteIcon from '/icons/delete.png';
import editIcon from '/icons/edit.png';
import refreshIcon from '/icons/refresh.png';

interface PatientsTableBodyProps {
  patients: IUserProfile[];
}

export default function PatientsTableBody({
  patients,
}: PatientsTableBodyProps) {
  const handleStatusChange = useTogglePatientStatusAsTherapistMutation();

  const handlePatientStatusChange = (patientId: number) => {
    handleStatusChange.mutate(patientId);
  };

  if (handleStatusChange.isPending) {
    return (
      <div className="flex justify-center items-center h-96 w-full">
        <DNALoader />
      </div>
    );
  }

  return (
    <>
      <tbody className="xxs:text-xxs text-xs md:text-sm">
        {patients && patients.length > 0 ? (
          patients.map((patient, index) => {
            const isLastRow = index === patients.length - 1;

            return (
              <tr key={patient.id} className={`odd:bg-white even:bg-gray-50`}>
                <td
                  className={`${isLastRow ? 'rounded-bl-2xl' : ''} border border-gray-300 px-4 py-2 text-center`}
                >
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

                <td className="border border-gray-300 px-4 py-2  text-center">
                  <Button
                    className="w-12 md:w-25 flex justify-center items-center mx-auto hover:transform hover:scale-110"
                    // onClick={() => {
                    //   setSelectedPatient(patient);
                    //   setIsPatientDetailsModalOpen(true);
                    // }}
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

                <td
                  className={`${isLastRow ? 'rounded-br-2xl' : ''} border border-gray-300 px-4 py-2  text-center`}
                >
                  <Button
                    className="w-12 md:w-25 flex justify-center items-center mx-auto hover:transform hover:scale-110"
                    // onClick={() => {
                    //   setSelectedPatient(patient);
                    //   setIsDeletePatientModalOpen(true);
                    // }}
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
            );
          })
        ) : (
          <tr>
            <td
              className="border border-gray-300 px-4 py-2 text-center"
              colSpan={5}
            >
              Aucun patient trouvé
            </td>
          </tr>
        )}
      </tbody>
    </>
  );
}
