import { Button } from '@headlessui/react';
import type { IPatientsTableRowData } from '../../../../../@types/interfaces/therapistInterfaces';
import { useTherapistSelectionContext } from '../../../../../hooks/context/therapist/useTherapistSelectionContext';
import { useUTherapistUiContext } from '../../../../../hooks/context/therapist/useTherapistUiContext';
import { getEntityStatusText } from '../../../../../utils/functions/getEntityStatusText';
import deleteIcon from '/icons/delete.png';
import messageIcon from '/icons/message.png';

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
          return (
            <tr
              key={patient.id}
              className="transition-colors duration-150 hover:bg-teal-50/40"
            >
              <td
                className={`border-b border-slate-200 font-medium text-slate-700 px-4 py-3 text-center`}
              >
                {patient.id}
              </td>

              <td className="border-b border-slate-200 px-4 py-3 text-center font-medium text-slate-700">
                <button
                  className="hover:text-secondaryBlue hover:font-semibold hover:transform hover:scale-105 hover:italic font-medium cursor-pointer"
                  onClick={() => handlePatientNameClick(patient)}
                >
                  {patient.fullName}
                </button>
              </td>

              <td className="border-b border-slate-200 px-4 py-3 text-center">
                <div
                  className={`inline-flex items-center gap-2 rounded-full px-2.5 py-1`}
                >
                  <span
                    className={`h-4 w-4 rounded-full ${
                      patient.status === 'active'
                        ? 'bg-green-500'
                        : patient.status === 'inactive'
                          ? 'bg-slate-400'
                          : patient.status === 'pending'
                            ? 'bg-yellow-500'
                            : 'bg-red-500'
                    }`}
                  />

                  <span className="text-sm font-medium tracking-wide">
                    {getEntityStatusText(patient.status ?? '')}
                  </span>
                </div>
              </td>

              <td className="border-b border-slate-200 px-4 py-3 text-center font-medium text-slate-700">
                <button className="hover:text-secondaryBlue hover:font-semibold hover:transform hover:scale-105 hover:italic font-medium cursor-pointer flex items-center justify-center gap-2 w-full">
                  {patient.therapist ? (
                    <>
                      {patient.therapist?.picture_url && (
                        <img
                          src={patient.therapist?.picture_url}
                          alt={patient.therapist?.fullName ?? 'Therapist'}
                          className="w-6 h-6 rounded-full"
                        />
                      )}
                      <p className="text-sm font-medium ">
                        {patient.therapist?.fullName ?? ''}
                      </p>
                    </>
                  ) : (
                    <p className="text-sm font-medium text-slate-400">
                      Aucun thérapeute assigné
                    </p>
                  )}
                </button>
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
