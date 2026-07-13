import { Clock3, UserCheck, UserPlus, Users } from 'lucide-react';
import PatientStatisticCard from '../../components/pages/therapist/patients/PatientStatisticCard';
import type { PatientStatisticsProps } from '../../@types/props/therapistProps';

export default function PatientStatistics({
  patientsStatistics,
}: PatientStatisticsProps) {
  return (
    <div className="flex w-full justify-between gap-4 mb-4">
      <PatientStatisticCard
        title="Patients"
        value={patientsStatistics.total}
        icon={<Users className="h-6 w-6" />}
        variant="teal"
      />

      <PatientStatisticCard
        title="Actifs"
        value={patientsStatistics.active}
        icon={<UserCheck className="h-6 w-6" />}
        variant="green"
      />

      <PatientStatisticCard
        title="En attente"
        value={patientsStatistics.pending}
        icon={<Clock3 className="h-6 w-6" />}
        variant="yellow"
      />

      <PatientStatisticCard
        title="Nouveaux ce mois"
        value={patientsStatistics.newThisMonth}
        icon={<UserPlus className="h-6 w-6" />}
        variant="blue"
      />
    </div>
  );
}
