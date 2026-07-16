import { useState } from 'react';
import type { IPrescriptionSummary } from '../../../../../@types/interfaces/therapistInterfaces';
import type { PatientHistoryContainerProps } from '../../../../../@types/props/componentProps';
import PatientPrescriptionCard from './PatientPrescriptionCard';

export default function PatientHistoryContainer({
  data,
}: PatientHistoryContainerProps) {
  const [expandedPrescriptionId, setExpandedPrescriptionId] = useState<
    number | null
  >(null);

  const handlePrescriptionToggle = (prescriptionId: number) => {
    setExpandedPrescriptionId((prevId) =>
      prevId === prescriptionId ? null : prescriptionId
    );
  };
  return (
    <div className="flex flex-col gap-4">
      {data?.prescriptions.map((prescription: IPrescriptionSummary) => {
        const expanded = expandedPrescriptionId === prescription.id;
        const completedAppointments =
          prescription.completed_appointment_quantity;
        const totalAppointments = prescription.appointment_quantity;

        const progress =
          totalAppointments > 0
            ? (completedAppointments / totalAppointments) * 100
            : 0;

        return (
          <PatientPrescriptionCard
            key={prescription.id}
            prescription={prescription}
            expanded={expanded}
            handlePrescriptionToggle={handlePrescriptionToggle}
            progress={progress}
          />
        );
      })}
    </div>
  );
}
