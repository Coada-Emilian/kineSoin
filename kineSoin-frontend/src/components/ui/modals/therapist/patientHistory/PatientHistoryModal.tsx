import {
  CalendarDays,
  ChevronDown,
  ChevronUp,
  CircleCheckBig,
  Clock3,
  NotepadTextDashed,
  SportShoe,
  Stethoscope,
  UserRound,
  XCircle,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import type { BasicModalProps } from '../../../../../@types/props/modalProps';
import { useTherapistSelectionContext } from '../../../../../hooks/context/therapist/useTherapistSelectionContext';
import { useFetchPatientHistoryAsTherapistQuery } from '../../../../../hooks/therapist/useFetchPatientHistoryAsTherapistQuery';
import { formatDate } from '../../../../../utils/functions/formatDate';
import CustomButton from '../../../buttons/CustomButton';
import DNALoader from '../../../DNALoader';
import PrescriptionProgressSection from '../prescriptionDetails/PrescriptionProgressSection';
import TherapistModal from '../TherapistModal';

export default function PatientHistoryModal({
  isOpen,
  onClose,
}: BasicModalProps) {
  const { selectedPatient } = useTherapistSelectionContext();

  const [expandedPrescriptionId, setExpandedPrescriptionId] = useState<
    number | null
  >(null);

  const { data: patientDataHistory, isLoading: isPatientHistoryLoading } =
    useFetchPatientHistoryAsTherapistQuery({
      patientId: selectedPatient?.id,
    });

  useEffect(() => {
    console.log(patientDataHistory);
  }, [patientDataHistory]);

  if (isPatientHistoryLoading) {
    return <DNALoader />;
  }

  if (patientDataHistory) {
    const patientDetails = {
      surname: patientDataHistory.surname,
      name: patientDataHistory.name,
      picture_url: patientDataHistory.picture_url,
    };

    const totalPrescriptions = patientDataHistory.prescriptions.length;

    const totalAppointments = patientDataHistory.prescriptions.reduce(
      (total: number, prescription) =>
        total + prescription.appointment_quantity,
      0
    );

    const firstPrescriptionDate =
      patientDataHistory.prescriptions.length > 0
        ? [...patientDataHistory.prescriptions].sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
          )[0].date
        : null;

    const completedAppointments = patientDataHistory.prescriptions.reduce(
      (total, prescription) =>
        total + prescription.completed_appointment_quantity,
      0
    );

    const progress = Math.round(
      (completedAppointments / totalAppointments) * 100
    );
    return (
      <TherapistModal
        isOpen={isOpen}
        onClose={onClose}
        header="Historique du patient"
        patient={patientDetails}
        size="xl"
        message={
          <>
            <span className="block text-2xl font-semibold not-italic">
              {patientDetails.surname} {patientDetails.name}
            </span>

            <p className="mt-1 text-base italic text-slate-500">
              Total : {totalPrescriptions} ordonnance
              {totalPrescriptions > 1 ? 's' : ''}
            </p>
          </>
        }
      >
        <div className="flex flex-col gap-6 p-6">
          {/* Summary */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <div className="grid grid-cols-3 divide-x divide-slate-200">
              <div className="flex flex-col items-center gap-2">
                <div className="rounded-full bg-teal-100 p-3">
                  <NotepadTextDashed className="size-6 text-teal-600" />
                </div>

                <p className="text-2xl font-bold text-slate-700">
                  {totalPrescriptions}
                </p>

                <p className="text-sm text-slate-500">
                  ordonnance{totalPrescriptions > 1 ? 's' : ''}
                </p>
              </div>

              <div className="flex flex-col items-center gap-2">
                <div className="rounded-full bg-blue-100 p-3">
                  <SportShoe className="size-6 text-blue-600" />
                </div>

                <p className="text-2xl font-bold text-slate-700">
                  {totalAppointments}
                </p>

                <p className="text-sm text-slate-500">séances prévues</p>
              </div>

              <div className="flex flex-col items-center gap-2">
                <div className="rounded-full bg-violet-100 p-3">
                  <CalendarDays className="size-6 text-violet-600" />
                </div>

                <p className="text-base font-semibold text-slate-700">
                  {firstPrescriptionDate
                    ? formatDate(firstPrescriptionDate)
                    : '-'}
                </p>

                <p className="text-sm text-slate-500">Première ordonnance</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {patientDataHistory.prescriptions.map((prescription) => {
              const expanded = expandedPrescriptionId === prescription.id;

              return (
                <div
                  key={prescription.id}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                >
                  <button
                    type="button"
                    className="flex w-full items-center justify-between p-5 transition hover:bg-slate-50"
                    onClick={() =>
                      setExpandedPrescriptionId(
                        expanded ? null : prescription.id
                      )
                    }
                  >
                    <div className="text-left">
                      <h3 className="text-lg font-semibold text-slate-700">
                        {prescription.affliction.name}
                      </h3>

                      <p className="text-sm text-slate-500">
                        Ordonnance #{prescription.id} •{' '}
                        {formatDate(prescription.date)}
                      </p>

                      <p className="mt-1 text-sm text-teal-600">
                        {prescription.completed_appointment_quantity} /{' '}
                        {prescription.appointment_quantity} séances réalisées
                      </p>
                    </div>

                    {expanded ? (
                      <ChevronUp className="size-6 text-slate-500" />
                    ) : (
                      <ChevronDown className="size-6 text-slate-500" />
                    )}
                  </button>

                  {expanded && (
                    <div className="border-t border-slate-200 p-5">
                      {/* PROGRESS */}

                      <PrescriptionProgressSection
                        progress={progress}
                        completedAppointments={
                          prescription.completed_appointment_quantity
                        }
                        totalAppointments={prescription.appointment_quantity}
                      />

                      {/* INFO */}

                      <div className="mt-6 grid grid-cols-2 gap-4">
                        <div className="rounded-xl bg-slate-50 p-4">
                          <div className="mb-2 flex items-center gap-2">
                            <Stethoscope className="size-5 text-teal-600" />

                            <span className="font-semibold">Médecin</span>
                          </div>

                          <p>
                            {prescription.medic.surname}{' '}
                            {prescription.medic.name}
                          </p>
                        </div>

                        <div className="rounded-xl bg-slate-50 p-4">
                          <div className="mb-2 flex items-center gap-2">
                            <NotepadTextDashed className="size-5 text-teal-600" />

                            <span className="font-semibold">Affection</span>
                          </div>

                          <p>{prescription.affliction.name}</p>
                        </div>
                      </div>

                      {/* APPOINTMENTS */}

                      <div className="mt-6">
                        <h4 className="mb-4 text-lg font-semibold text-slate-700">
                          Consultations
                        </h4>

                        <div className="flex flex-col divide-y divide-slate-100 rounded-xl border border-slate-100">
                          {prescription.appointments
                            .sort(
                              (a, b) =>
                                new Date(`${a.date}T${a.time}`).getTime() -
                                new Date(`${b.date}T${b.time}`).getTime()
                            )
                            .map((appointment) => (
                              <div
                                key={appointment.id}
                                className="flex items-center justify-between p-4"
                              >
                                <div className="flex items-center gap-4">
                                  {appointment.is_canceled ? (
                                    <XCircle className="size-6 text-red-500" />
                                  ) : appointment.is_accepted ? (
                                    <CircleCheckBig className="size-6 text-green-500" />
                                  ) : (
                                    <Clock3 className="size-6 text-amber-500" />
                                  )}

                                  <div className="flex flex-col items-start">
                                    <p className="font-semibold">
                                      {formatDate(appointment.date)}
                                    </p>

                                    <p className="text-sm text-slate-500">
                                      {appointment.time.slice(0, 5)}
                                    </p>
                                  </div>
                                </div>

                                <div className="flex items-center gap-2 text-slate-600">
                                  <UserRound className="size-5" />

                                  <span>
                                    {appointment.therapist.surname}{' '}
                                    {appointment.therapist.name}
                                  </span>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex justify-center pt-2">
            <CustomButton
              btn={{
                type: 'cancel',
                text: 'Retour',
                style: 'normal',
                hasBorder: true,
                onClick: onClose,
              }}
            />
          </div>
        </div>
      </TherapistModal>
    );
  }
}
