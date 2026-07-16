import { Ban, FileText, History, UserPen } from 'lucide-react';
import type { IPatientsTableRowDataDto } from '../../../../../@types/interfaces/therapistInterfaces';
import { useTherapistSelectionContext } from '../../../../../hooks/context/therapist/useTherapistSelectionContext';
import { useUTherapistUiContext } from '../../../../../hooks/context/therapist/useTherapistUiContext';
import { useAuthenticationContext } from '../../../../../hooks/context/useAuthenticationContext';
import { therapistPatientStatusConfig } from '../../../../../utils/config/therapist/therapistPatientStatusStyles';
import { getFormattedAppointmentDate } from '../../../../../utils/functions/getFormattedAppointmentDate';
import { getNameInitials } from '../../../../../utils/functions/therapist/getNameInitials';
import ActionDropdown from '../../../../ui/ActionDropdown';
import ActionButton from '../../../../ui/buttons/ActionButton';
import appointmentIcon from '/icons/appointment_128.png';
import messageIcon from '/icons/message_128.png';
import viewIcon from '/icons/view_128.png';
import calendarIcon from '/logos/appointment_48.webp';

export default function PatientsTableBody({
  patients,
}: {
  patients: IPatientsTableRowDataDto[];
}) {
  const { setOpenModal } = useUTherapistUiContext();

  const { setSelectedPatient } = useTherapistSelectionContext();

  const handleMessageIconClick = (patient: IPatientsTableRowDataDto) => {
    setSelectedPatient(patient);
    setOpenModal('extendedMessage');
  };

  const handleViewIconClick = (patient: IPatientsTableRowDataDto) => {
    setSelectedPatient(patient);
    setOpenModal('patientDetails');
  };

  const handleAppointmentIconClick = () => {
    console.log('Appointment icon clicked');
  };

  const handleHistoryClick = (patient: IPatientsTableRowDataDto) => {
    console.log('History clicked for patient:', patient);
  };

  const handlePrescriptionsClick = () => {
    console.log('Prescriptions clicked');
  };

  const handleDeleteClick = () => {
    console.log('Delete clicked');
  };

  const handleEditClick = () => {
    console.log('Edit clicked');
  };

  const { user } = useAuthenticationContext();

  return (
    <>
      <tbody className="xxs:text-xxs text-xs md:text-sm">
        {patients.map((patient) => {
          const status =
            therapistPatientStatusConfig[
              patient.status as keyof typeof therapistPatientStatusConfig
            ] ?? therapistPatientStatusConfig.inactive;

          const lastAppointment = getFormattedAppointmentDate(
            patient.lastAppointmentAt
          );

          const isSameTherapist = patient.therapist?.id === user?.id;

          return (
            <tr
              key={patient.id}
              className="transition-colors duration-150 hover:bg-teal-50/40"
            >
              <td className="border-b border-slate-200 px-4 py-3">
                <div className="group flex w-full items-center gap-4 rounded-lg px-2 py-2 text-left transition-all duration-150 justify-center">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-50 font-semibold text-slate-600 transition-all duration-150 group-hover:bg-teal-100 group-hover:text-secondaryBlue">
                    {getNameInitials(patient?.fullName ? patient.fullName : '')}
                  </div>

                  <div className="min-w-0 w-1/2">
                    <p className="font-semibold text-slate-700 transition-colors duration-150 group-hover:text-secondaryBlue">
                      {patient.fullName}
                    </p>

                    <p className="truncate text-xs text-slate-400 transition-colors duration-150 group-hover:text-slate-600 font-medium">
                      {patient.email}
                    </p>

                    <p className="text-xs text-slate-400 transition-colors duration-150 group-hover:text-slate-600 tracking-wide font-medium">
                      {patient.fullPhoneNumber}
                    </p>
                  </div>
                </div>
              </td>

              <td className="border-b border-slate-200 px-4 py-3 text-center">
                <div
                  className={`inline-flex items-center gap-2 rounded-full px-2.5 py-1 ${status.background}`}
                >
                  <span className={`h-2.5 w-2.5 rounded-full ${status.dot}`} />

                  <span
                    className={`text-sm font-medium tracking-wide ${status.text}`}
                  >
                    {status.label}
                  </span>
                </div>
              </td>

              <td className="border-b border-slate-200 px-4 py-3">
                {patient.therapist ? (
                  <button className="group flex w-full gap-4 rounded-lg px-2 py-2 text-left transition-all duration-150 cursor-pointer items-center justify-center">
                    <img
                      src={patient.therapist.picture_url}
                      alt={`${patient.therapist.name} ${patient.therapist.surname}`}
                      className="h-10 w-10 shrink-0 rounded-full object-cover transition-all duration-150 group-hover:ring-2 group-hover:ring-teal-200"
                    />

                    <div className="min-w-0 ">
                      <p className="font-semibold text-slate-700 transition-colors duration-150 group-hover:text-secondaryBlue">
                        {isSameTherapist
                          ? 'Vous'
                          : `${patient.therapist.name} ${patient.therapist.surname}`}
                      </p>

                      <p className="text-xs text-slate-400 transition-colors duration-150 group-hover:text-slate-600 font-medium tracking-wide">
                        Kinésithérapeute
                      </p>
                    </div>
                  </button>
                ) : (
                  <div className="px-2 py-2 text-center">
                    <p className="text-sm italic text-slate-400 font-semibold">
                      Non assigné
                    </p>
                  </div>
                )}
              </td>

              <td className="border-b border-slate-200 px-4 py-3">
                {lastAppointment ? (
                  <div className="flex items-center gap-3 justify-center">
                    <img
                      src={calendarIcon}
                      alt="appointment"
                      className="w-4 md:w-5 shrink-0"
                    />

                    <div className="text-left">
                      <p className="font-medium text-slate-700">
                        {lastAppointment.date}
                      </p>

                      <p className="text-xs font-medium tracking-wide text-slate-400">
                        {lastAppointment.time}
                      </p>
                    </div>
                  </div>
                ) : (
                  <p className="text-center text-sm italic text-slate-400">—</p>
                )}
              </td>

              <td className="border-b border-slate-200 px-4 py-3">
                <div className="flex items-center justify-center gap-3">
                  <ActionButton
                    onClick={() => handleViewIconClick(patient)}
                    imgSrc={viewIcon}
                    altText="view"
                  />

                  <ActionButton
                    onClick={() => handleMessageIconClick(patient)}
                    imgSrc={messageIcon}
                    altText="message"
                  />

                  <ActionButton
                    onClick={() => handleAppointmentIconClick()}
                    imgSrc={appointmentIcon}
                    altText="appointment"
                  />

                  <ActionDropdown
                    actions={[
                      {
                        label: 'Historique',
                        icon: <History className="h-4 w-4 shrink-0" />,
                        onClick: handleHistoryClick(patient),
                      },
                      {
                        label: 'Ordonnances',
                        icon: <FileText className="h-4 w-4 shrink-0" />,
                        onClick: handlePrescriptionsClick,
                      },
                      {
                        separator: true,
                      },
                      {
                        label: 'Modifier',
                        icon: <UserPen className="h-4 w-4 shrink-0" />,
                        onClick: handleEditClick,
                      },

                      {
                        label: 'Supprimer',
                        icon: <Ban className="h-4 w-4 shrink-0" />,
                        danger: true,
                        onClick: handleDeleteClick,
                      },
                    ]}
                  />
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </>
  );
}
