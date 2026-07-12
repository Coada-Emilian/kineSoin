import { Button } from '@headlessui/react';
import { useEffect, useMemo, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import PatientsLinkButtons from '../../components/pages/therapist/patients/PatientsLinkButtons';
import PatientsTable from '../../components/pages/therapist/patients/PatientsTable';
import TherapistCard from '../../components/pages/therapist/TherapistCard';
import DNALoader from '../../components/ui/DNALoader';
import EmptyState from '../../components/ui/EmptyState';
import SearchBar from '../../components/ui/SearchBar';
import { useFetchAllPatientsAsTherapistQuery } from '../../hooks/therapist/useFetchAllPatientsAsTherapistQuery';

export default function PatientsPage() {
  const { data: allPatients = [], isLoading } =
    useFetchAllPatientsAsTherapistQuery();

  const { setHeroMessage } = useOutletContext<{
    setHeroMessage: React.Dispatch<React.SetStateAction<React.ReactNode>>;
  }>();

  const [searchTerm, setSearchTerm] = useState('');

  const filteredPatients = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) {
      return allPatients;
    }

    return allPatients.filter((patient) =>
      patient.fullName.trim().toLowerCase().includes(query)
    );
  }, [allPatients, searchTerm]);

  useEffect(() => {
    setHeroMessage(<>Retrouvez rapidement les informations de vos patients.</>);
  }, [setHeroMessage]);

  if (isLoading) {
    return (
      <div className="flex w-full items-center justify-center">
        <DNALoader />
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between w-full gap-4 mb-4">
        {' '}
        <PatientsLinkButtons />
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
