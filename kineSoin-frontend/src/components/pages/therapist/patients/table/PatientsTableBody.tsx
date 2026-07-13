import { Button } from '@headlessui/react';
import type { IPatientsTableRowData } from '../../../../../@types/interfaces/therapistInterfaces';
import { useTherapistSelectionContext } from '../../../../../hooks/context/therapist/useTherapistSelectionContext';
import { useUTherapistUiContext } from '../../../../../hooks/context/therapist/useTherapistUiContext';
import { therapistPatientStatusConfig } from '../../../../../utils/config/therapist/therapistPatientStatusStyles';
import { getFormattedAppointmentDate } from '../../../../../utils/functions/getFormattedAppointmentDate';
import { getNameInitials } from '../../../../../utils/functions/therapist/getNameInitials';
import deleteIcon from '/icons/delete.png';
import messageIcon from '/icons/message.png';
import appointmentIcon from '/logos/appointment_48.webp';

export default function PatientsTableBody({
  patients,
}: {
  patients: IPatientsTableRowData[];
}) {
  const { setOpenModal } = useUTherapistUiContext();

  const { setSelectedPatient } = useTherapistSelectionContext();

  const handleMessageIconClick = (patient: IPatientsTableRowData) => {
    setSelectedPatient(patient);
    setOpenModal('message');
  };

  const handleDeleteIconClick = (patient: IPatientsTableRowData) => {
    setSelectedPatient(patient);
    setOpenModal('delete');
  };

  const handlePatientNameClick = (patient: IPatientsTableRowData) => {
    setSelectedPatient(patient);
    setOpenModal('patientDetails');
  };

  return (
    <>
      <tbody className="xxs:text-xxs text-xs md:text-sm">
        {patients.map((patient) => {
          const status =
            therapistPatientStatusConfig[patient.status] ??
            therapistPatientStatusConfig.inactive;

          const lastAppointment = getFormattedAppointmentDate(
            patient.lastAppointmentAt
          );
          return (
            <tr
              key={patient.id}
              className="transition-colors duration-150 hover:bg-teal-50/40"
            >
              <td className="border-b border-slate-200 px-4 py-3">
                <button
                  onClick={() => handlePatientNameClick(patient)}
                  className="group flex w-full items-center gap-4 rounded-lg px-2 py-2 text-left cursor-pointer transition-all duration-150"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-50 font-semibold text-slate-600 transition-all duration-150 group-hover:bg-teal-100 group-hover:text-secondaryBlue">
                    {getNameInitials(patient.fullName)}
                  </div>

                  <div className="min-w-0">
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
                </button>
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
                  <button className="group flex w-full items-center gap-4 rounded-lg px-2 py-2 text-left transition-all duration-150 cursor-pointer">
                    <img
                      src={patient.therapist.picture_url}
                      alt={patient.therapist.fullName}
                      className="h-10 w-10 shrink-0 rounded-full object-cover transition-all duration-150 group-hover:ring-2 group-hover:ring-teal-200"
                    />

                    <div className="min-w-0">
                      <p className="font-semibold text-slate-700 transition-colors duration-150 group-hover:text-secondaryBlue">
                        {patient.therapist.fullName}
                      </p>

                      <p className="text-xs text-slate-400 transition-colors duration-150 group-hover:text-slate-600 font-medium tracking-wide">
                        Kinésithérapeute
                      </p>
                    </div>
                  </button>
                ) : (
                  <div className="px-2 py-2">
                    <p className="text-sm italic text-slate-400">Non assigné</p>
                  </div>
                )}
              </td>

              <td className="border-b border-slate-200 px-4 py-3">
                {lastAppointment ? (
                  <div className="flex items-center gap-3">
                    <img
                      src={appointmentIcon}
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

              <td className="border-b border-slate-200 px-4 py-3 text-center w-2/12 ">
                <Button
                  onClick={() => handleMessageIconClick(patient)}
                  className="flex justify-center items-center w-full"
                >
                  <img
                    src={messageIcon}
                    alt="message"
                    className={
                      'w-3 md:w-6 hover:transform hover:scale-125 cursor-pointer'
                    }
                  />
                </Button>
              </td>

              <td
                className={`border-b border-slate-200 px-4 py-3 text-center w-2/12 `}
              >
                <Button
                  className="flex justify-center items-center w-full"
                  onClick={() => {
                    handleDeleteIconClick(patient);
                  }}
                >
                  <img
                    src={deleteIcon}
                    alt="supprimer"
                    className={
                      'w-3 md:w-6 hover:transform hover:scale-125 cursor-pointer'
                    }
                  />
                </Button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </>
  );
}
