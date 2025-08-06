import { Button } from '@headlessui/react';
import { Link } from 'react-router-dom';
import { IUserProfile } from '../../../../../@types/interfaces/customInterfaces';
import { usePatientsContext } from '../../../../../utils/contexts/therapistSectionContext/PatientsContext';
import { useUIContext } from '../../../../../utils/contexts/therapistSectionContext/UIContext';
import DNALoader from '../../../../../utils/DNALoader';
import { formatPatientStatusText } from '../../../../../utils/functions/privateSection/therapistSection/formatPatientStatusText';
import { getPatientStatusBackgroundColor } from '../../../../../utils/functions/privateSection/therapistSection/getPatientStatusBackgroundColor';
import { useTogglePatientStatusAsTherapistMutation } from '../../../../../utils/functions/privateSection/therapistSection/mutations/useTogglePatientStatusAsTherapistMutation';
import deleteIcon from '/icons/delete.png';
import editIcon from '/icons/edit.png';
import refreshIcon from '/icons/refresh.png';

interface PatientsTableBodyProps {
  patients: IUserProfile[];
  therapist: IUserProfile;
}

export default function PatientsTableBody({
  patients,
  therapist,
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

  const handleStatusChangeClick = (patientId: number) => {
    handlePatientStatusChange(patientId);
  };

  const { setSelectedPatient } = usePatientsContext();

  const { setIsDeletePatientModalOpen } = useUIContext();

  const handleDeleteClick = (patient: IUserProfile) => {
    setSelectedPatient({
      id: patient.id,
      name: patient.fullName?.split(' ')[0] ?? '',
      surname: patient.fullName?.split(' ').slice(1).join(' ') ?? '',
      picture_url: patient.picture_url ?? '',
    });
    setIsDeletePatientModalOpen(true);
  };

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
                  className={`border border-gray-300 ${getPatientStatusBackgroundColor(patient.status ?? '')} px-4 py-2 text-center flex gap-1 items-center justify-center`}
                >
                  {(patient.status === 'active' ||
                    patient.status === 'inactive') &&
                    therapist.fullName === patient.therapist?.fullName && (
                      <Button
                        className=" md:block"
                        onClick={() => handleStatusChangeClick(patient.id)}
                      >
                        <img
                          src={refreshIcon}
                          alt="change status"
                          className="max-w-4 md:max-w-6 hover:animate-spin"
                        />
                      </Button>
                    )}

                  <p>{formatPatientStatusText(patient.status ?? '')}</p>
                </td>

                <td className="border border-gray-300 px-2 text-center  ">
                  <Link
                    to={`/therapist/therapists/${patient.therapist?.id}`}
                    className="flex items-center justify-center gap-2"
                  >
                    <img
                      src={patient.therapist?.picture_url}
                      alt={patient.therapist?.fullName ?? 'Therapist'}
                      className="w-6 h-6 rounded-full"
                    />
                    <p className="text-sm font-medium italic">
                      {patient.therapist?.fullName ?? 'Inconnu'}
                    </p>
                  </Link>
                </td>

                <td className="border border-gray-300 px-4 py-2  text-center">
                  <Link
                    to={`/therapist/patient/${patient.id}`}
                    className="w-12 md:w-25 flex justify-center items-center mx-auto hover:transform hover:scale-110"
                  >
                    <img
                      src={editIcon}
                      alt="edit"
                      className="mx-auto w-5 md:mx-1"
                    />

                    <p className="text-blue-300 font-semibold hidden md:block">
                      Inspecter
                    </p>
                  </Link>
                </td>

                <td
                  className={`${isLastRow ? 'rounded-br-2xl' : ''} border border-gray-300 px-4 py-2  text-center`}
                >
                  <Button
                    className="w-12 md:w-25 flex justify-center items-center mx-auto hover:transform hover:scale-110"
                    onClick={() => {
                      handleDeleteClick(patient);
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
