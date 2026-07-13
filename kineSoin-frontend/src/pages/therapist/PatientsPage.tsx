import { Button } from '@headlessui/react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import type { TherapistPatientQuickFilterTypes } from '../../@types/types/therapistTypes';
import PatientsLinkButtons from '../../components/pages/therapist/patients/PatientsLinkButtons';
import PatientsTable from '../../components/pages/therapist/patients/PatientsTable';
import TherapistCard from '../../components/pages/therapist/TherapistCard';
import DNALoader from '../../components/ui/DNALoader';
import EmptyState from '../../components/ui/EmptyState';
import SearchBar from '../../components/ui/SearchBar';
import { useAuthenticationContext } from '../../hooks/context/useAuthenticationContext';
import { useFetchAllPatientsAsTherapistQuery } from '../../hooks/therapist/useFetchAllPatientsAsTherapistQuery';
import PatientStatistics from './PatientStatistics';
import filterIcon from '/icons/filter_128.png';

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

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const [sortBy, setSortBy] = useState<'patient' | 'status' | 'therapist'>(
    'patient'
  );

  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const searchedPatients = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) {
      return statusFilteredPatients;
    }

    return statusFilteredPatients.filter((patient) =>
      patient.fullName.trim().toLowerCase().includes(query)
    );
  }, [statusFilteredPatients, searchTerm]);

  const sortedPatients = useMemo(() => {
    const sorted = [...searchedPatients];

    if (sortBy === 'patient') {
      sorted.sort((a, b) => {
        const comparison = a.fullName.localeCompare(b.fullName, 'fr', {
          sensitivity: 'base',
        });

        return sortOrder === 'asc' ? comparison : -comparison;
      });
    }

    if (sortBy === 'status') {
      const statusOrder = {
        active: 0,
        pending: 1,
        inactive: 2,
        banned: 3,
      };

      sorted.sort((a, b) => {
        const comparison = statusOrder[a.status] - statusOrder[b.status];

        return sortOrder === 'asc' ? comparison : -comparison;
      });
    }

    if (sortBy === 'therapist') {
      sorted.sort((a, b) => {
        const therapistA = a.therapist?.fullName ?? '';
        const therapistB = b.therapist?.fullName ?? '';

        const comparison = therapistA.localeCompare(therapistB, 'fr', {
          sensitivity: 'base',
        });

        return sortOrder === 'asc' ? comparison : -comparison;
      });
    }

    return sorted;
  }, [searchedPatients, sortBy, sortOrder]);

  const totalPages = Math.ceil(sortedPatients.length / rowsPerPage);

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

  const [isFilterPopoverOpen, setIsFilterPopoverOpen] = useState(false);

  const filterPopoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        filterPopoverRef.current &&
        !filterPopoverRef.current.contains(event.target as Node)
      ) {
        setIsFilterPopoverOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  const displayedPatients = sortedPatients.slice(startIndex, endIndex);

  const displayStart = displayedPatients.length === 0 ? 0 : startIndex + 1;

  const displayEnd = startIndex + displayedPatients.length;
  const displayTotal = sortedPatients.length;

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedFilter, rowsPerPage]);

  if (isLoading) {
    return (
      <div className="flex w-full items-center justify-center">
        <DNALoader />
      </div>
    );
  }
  const handleSort = (column: 'patient' | 'status' | 'therapist') => {
    if (column === sortBy) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  return (
    <>
      <PatientStatistics patientsStatistics={patientStatistics} />

      <div className="flex items-center justify-between w-full gap-4 mb-4">
        <PatientsLinkButtons
          selectedFilter={selectedFilter}
          onSelect={setSelectedFilter}
        />

        <div className="flex items-center justify-end w-full gap-4">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Rechercher un patient..."
          />
        </div>
        <div ref={filterPopoverRef} className="relative">
          <button
            type="button"
            onClick={() => setIsFilterPopoverOpen((prev) => !prev)}
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 shadow-xs outline-none transition hover:border-teal-500 hover:bg-slate-50 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 cursor-pointer"
          >
            <img
              src={filterIcon}
              alt="Filtres"
              className="h-4 w-4 shrink-0 opacity-60"
            />

            <span>Filtres</span>
          </button>

          {isFilterPopoverOpen && (
            <div className="absolute right-0 top-full z-50 mt-2 w-80 rounded-xl border border-slate-200 bg-white p-5 shadow-lg">
              <h3 className="mb-3 text-sm font-semibold text-slate-700">
                Filtres
              </h3>

              <p className="text-sm text-slate-500">🚧 Work in progress</p>
            </div>
          )}
        </div>
      </div>

      <TherapistCard
        title="Liste des patients"
        subtitle={
          'Sélectionnez un patient pour consulter ses informations ou effectuer une action.'
        }
      >
        {displayedPatients.length ? (
          <PatientsTable
            allPatients={displayedPatients}
            sortBy={sortBy}
            sortOrder={sortOrder}
            onSort={handleSort}
          />
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
        <div className="flex items-center justify-between border-t border-slate-200 px-6 py-4">
          <p className="text-sm text-slate-500">
            Affichage de {displayStart} à {displayEnd} sur {displayTotal}{' '}
            {displayTotal > 1 ? 'patients' : 'patient'}
          </p>

          <div className="flex items-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
            >
              ←
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button key={index} onClick={() => setCurrentPage(index + 1)}>
                {index + 1}
              </button>
            ))}
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              →
            </button>
          </div>
          <select
            value={rowsPerPage}
            onChange={(e) => setRowsPerPage(Number(e.target.value))}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-xs outline-none transition hover:border-teal-500 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 cursor-pointer"
          >
            <option value={10}>10 par page</option>
            <option value={25}>25 par page</option>
            <option value={50}>50 par page</option>
          </select>
        </div>
      </TherapistCard>
    </>
  );
}
