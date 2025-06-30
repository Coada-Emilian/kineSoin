import { Button } from '@headlessui/react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IUserProfile } from '../../../../../@types/interfaces/customInterfaces';
import { useTherapistSectionContext } from '../../../../../utils/contexts/TherapistSectionContext';
import DNALoader from '../../../../../utils/DNALoader';
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

  useEffect(() => {
    for (const patient of patients) {
      console.log(patient);
    }
  }, [patients]);

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-300';
      case 'pending':
        return 'bg-yellow-300';
      case 'banned':
        return 'bg-red-300';
      default:
        return 'bg-gray-200';
    }
  };

  const handleStatusChangeClick = (patientId: number) => {
    handlePatientStatusChange(patientId);
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'ACTIF';
      case 'inactive':
        return 'INACTIF';
      case 'banned':
        return 'BANNI';
      default:
        return 'EN ATTENTE';
    }
  };

  const {
    setSelectedPatient,
    setIsDeletePatientModalOpen,
    setIsPatientDetailsModalOpen,
  } = useTherapistSectionContext();

  const handleEditClick = (patient: IUserProfile) => {
    setSelectedPatient({
      id: patient.id,
      name: patient.fullName?.split(' ')[0] ?? '',
      surname: patient.fullName?.split(' ').slice(1).join(' ') ?? '',
      picture_url: patient.picture_url ?? '',
    });
    setIsPatientDetailsModalOpen(true);
  };

  const handleDeleteClick = (patient: IUserProfile) => {
    setSelectedPatient({
      id: patient.id,
      name: patient.fullName?.split(' ')[0] ?? '',
      surname: patient.fullName?.split(' ').slice(1).join(' ') ?? '',
      picture_url: patient.picture_url ?? '',
    });
    setIsDeletePatientModalOpen(true);
  };

  const { tableType } = useTherapistSectionContext();

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
                  className={`border border-gray-300 ${getStatusColor(patient.status ?? '')} px-4 py-2 text-center flex gap-1 items-center justify-center`}
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

                  <p>{getStatusText(patient.status ?? '')}</p>
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
                  <Button
                    className="w-12 md:w-25 flex justify-center items-center mx-auto hover:transform hover:scale-110"
                    onClick={() => {
                      handleEditClick(patient);
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
