import { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import PatientsLinkButtons from '../../components/pages/therapist/patients/PatientsLinkButtons';
import PatientsTable from '../../components/pages/therapist/patients/PatientsTable';
import TherapistCard from '../../components/pages/therapist/TherapistCard';
import DNALoader from '../../components/ui/DNALoader';
import SearchBar from '../../components/ui/SearchBar';
import { useFetchAllPatientsAsTherapistQuery } from '../../hooks/therapist/useFetchAllPatientsAsTherapistQuery';

export default function PatientsPage() {
  const { data: allPatients = [], isLoading } =
    useFetchAllPatientsAsTherapistQuery();

  const { setHeroMessage } = useOutletContext<{
    setHeroMessage: React.Dispatch<React.SetStateAction<React.ReactNode>>;
  }>();

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
        <SearchBar />
      </div>

      <TherapistCard
        title="Liste des patients"
        subtitle={
          'Sélectionnez un patient pour consulter ses informations ou effectuer une action.'
        }
      >
        <PatientsTable allPatients={allPatients} />
      </TherapistCard>
    </>
  );
}
