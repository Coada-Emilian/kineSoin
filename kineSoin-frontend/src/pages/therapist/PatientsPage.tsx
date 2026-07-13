import { Button } from '@headlessui/react';
import { Clock3, UserCheck, UserPlus, Users } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import type { TherapistPatientQuickFilterTypes } from '../../@types/types/therapistTypes';
import PatientsLinkButtons from '../../components/pages/therapist/patients/PatientsLinkButtons';
import PatientsTable from '../../components/pages/therapist/patients/PatientsTable';
import PatientStatisticCard from '../../components/pages/therapist/patients/PatientStatisticCard';
import TherapistCard from '../../components/pages/therapist/TherapistCard';
import DNALoader from '../../components/ui/DNALoader';
import EmptyState from '../../components/ui/EmptyState';
import SearchBar from '../../components/ui/SearchBar';
import { useAuthenticationContext } from '../../hooks/context/useAuthenticationContext';
import { useFetchAllPatientsAsTherapistQuery } from '../../hooks/therapist/useFetchAllPatientsAsTherapistQuery';

export default function PatientsPage() {
  const { data: allPatients = [], isLoading } =
    useFetchAllPatientsAsTherapistQuery();

  const { user } = useAuthenticationContext();

  const { setHeroMessage } = useOutletContext<{
    setHeroMessage: React.Dispatch<React.SetStateAction<React.ReactNode>>;
  }>();

  useEffect(() => {
    setHeroMessage(<>Retrouvez rapidement les informations de vos patients.</>);
  }, [setHeroMessage]);

  const [selectedFilter, setSelectedFilter] =
    useState<TherapistPatientQuickFilterTypes>('all');

  const statusFilteredPatients = useMemo(() => {
    if (selectedFilter === 'all') {
      return allPatients;
    }

    if (selectedFilter === 'self') {
      return allPatients.filter(
        (patient) => patient.therapist?.id === user?.id
      );
    }

    return allPatients.filter((patient) => patient.status === selectedFilter);
  }, [allPatients, selectedFilter, user?.id]);

  const [searchTerm, setSearchTerm] = useState('');

  const filteredPatients = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) {
      return statusFilteredPatients;
    }

    return statusFilteredPatients.filter((patient) =>
      patient.fullName.trim().toLowerCase().includes(query)
    );
  }, [statusFilteredPatients, searchTerm]);

  const patientStatistics = useMemo(() => {
    const now = new Date();

    return {
      total: allPatients.length,

      active: allPatients.filter((patient) => patient.status === 'active')
        .length,

      pending: allPatients.filter((patient) => patient.status === 'pending')
        .length,

      newThisMonth: allPatients.filter((patient) => {
        const createdAt = new Date(patient.createdAt);

        return (
          createdAt.getMonth() === now.getMonth() &&
          createdAt.getFullYear() === now.getFullYear()
        );
      }).length,
    };
  }, [allPatients]);

  if (isLoading) {
    return (
      <div className="flex w-full items-center justify-center">
        <DNALoader />
      </div>
    );
  }

  return (
    <>
      <div className="flex w-full justify-between gap-4 mb-4">
        <PatientStatisticCard
          title="Patients"
          value={patientStatistics.total}
          icon={<Users className="h-6 w-6" />}
          variant="teal"
        />

        <PatientStatisticCard
          title="Actifs"
          value={patientStatistics.active}
          icon={<UserCheck className="h-6 w-6" />}
          variant="green"
        />

        <PatientStatisticCard
          title="En attente"
          value={patientStatistics.pending}
          icon={<Clock3 className="h-6 w-6" />}
          variant="yellow"
        />

        <PatientStatisticCard
          title="Nouveaux ce mois"
          value={patientStatistics.newThisMonth}
          icon={<UserPlus className="h-6 w-6" />}
          variant="blue"
        />
      </div>

      <div className="flex items-center justify-between w-full gap-4 mb-4">
        <PatientsLinkButtons
          selectedFilter={selectedFilter}
          onSelect={setSelectedFilter}
        />

        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Rechercher un patient..."
        />
      </div>

      <TherapistCard
        title="Liste des patients"
        subtitle={
          'Sélectionnez un patient pour consulter ses informations ou effectuer une action.'
        }
      >
        {filteredPatients.length ? (
          <PatientsTable allPatients={filteredPatients} />
        ) : (
          <EmptyState
            title="Aucun patient trouvé"
            description="Aucun patient ne correspond à votre recherche."
          >
            <Button
              onClick={() => setSearchTerm('')}
              className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600 cursor-pointer"
            >
              Effacer la recherche
            </Button>
          </EmptyState>
        )}
      </TherapistCard>
    </>
  );
}
