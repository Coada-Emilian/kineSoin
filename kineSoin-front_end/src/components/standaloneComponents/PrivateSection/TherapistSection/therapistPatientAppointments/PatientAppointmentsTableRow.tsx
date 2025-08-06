import { Button } from '@headlessui/react';
import { IPatientAppointmentDetails } from '../../../../../@types/interfaces/customInterfaces';
import AppointmentDetailsModal from '../modals/AppointmentDetailsModal';
import CancelPatientAppointmentModal from '../modals/CancelPatientAppointmentModal';
import cancelIcon from '/icons/cancel.png';
import cancelIcon2 from '/icons/cancel2.png';
import blueMagnifierIcon from '/icons/magnifier_blue.png';
import grayMagnifierIcon from '/icons/magnifier_gray.png';
import { useUIContext } from '../../../../../utils/contexts/therapistSectionContext/UIContext';

interface ComponentProps {
  appointment: IPatientAppointmentDetails;
  is_past: boolean;
  is_last_row?: boolean;
}

export default function PatientAppointmentsTableRow({
  appointment,
  is_past,
  is_last_row,
}: ComponentProps) {
  const basicClassName = 'border border-gray-300 p-1 md:p-2 text-center';

  const {
    isCancelAppointmentModalOpen,
    setIsCancelAppointmentModalOpen,
    isInspectModalOpen,
    setIsInspectModalOpen,
  } = useUIContext();

  const handleCancelAppointmentClick = () => {
    setIsCancelAppointmentModalOpen(true);
  };

  const handleInspectClick = () => {
    setIsInspectModalOpen(true);
  };

  return (
    <>
      <tr
        className={`${is_past ? 'text-gray-500 italic font-light' : 'text-primaryBlue font-medium'}  border-b border-gray-300`}
      >
        <td
          className={` ${is_last_row ? 'rounded-bl-2xl' : ''} ${basicClassName}`}
        >
          {appointment.id}
        </td>

        <td className={`${basicClassName}`}>
          {new Date(appointment.date).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          })}
        </td>

        <td className={`${basicClassName}`}>
          {appointment.time.split(':')[0]}h{appointment.time.split(':')[1]}
        </td>

        <td className={`${basicClassName}`}>
          {appointment.therapist.name} {appointment.therapist.surname}
        </td>

        <td className="border border-gray-300 px-4 py-2  text-center">
          <Button
            onClick={() => {
              handleInspectClick();
            }}
            className={`${is_past ? '' : 'hover:transform hover:scale-110'} w-12 md:w-25 flex justify-center items-center mx-auto `}
          >
            <img
              src={`${is_past ? grayMagnifierIcon : blueMagnifierIcon}`}
              alt="edit"
              className="mx-auto w-3 md:w-5 md:mx-1"
            />

            <p
              className={`${is_past ? 'text-gray-500' : 'text-primaryBlue'} font-semibold hidden md:block`}
            >
              Inspecter
            </p>
          </Button>
        </td>

        <td
          className={`${is_last_row ? 'rounded-br-2xl' : ''} border border-gray-300 px-4 py-2  text-center`}
        >
          <Button
            className={`${is_past ? '' : 'hover:transform hover:scale-110'} w-12 md:w-25 flex justify-center items-center mx-auto `}
            onClick={() => {
              handleCancelAppointmentClick();
            }}
          >
            <img
              src={`${is_past ? cancelIcon2 : cancelIcon}`}
              alt="annuler"
              className="mx-auto w-3 md:w-5 md:mx-1"
            />

            <p
              className={`${is_past ? 'text-gray-500' : 'text-red-600'} font-semibold hidden md:block`}
            >
              Annuler
            </p>
          </Button>
        </td>
      </tr>

      {isCancelAppointmentModalOpen && (
        <CancelPatientAppointmentModal
          appointment={appointment}
          isOpen={isCancelAppointmentModalOpen}
          onClose={() => {
            setIsCancelAppointmentModalOpen(false);
          }}
        />
      )}

      {isInspectModalOpen && (
        <AppointmentDetailsModal
          appointment={appointment}
          isOpen={isInspectModalOpen}
          onClose={() => {
            setIsInspectModalOpen(false);
          }}
        />
      )}
    </>
  );
}
