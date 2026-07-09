import type { TherapistPageProps } from '../../@types/props/therapistProps';
import TherapistDashboardTable from '../../components/pages/therapist/dashboard/TherapistDashboardTable';
import { getTherapistPageTitle } from '../../utils/functions/therapist/getTherapistPageTitle';

export default function DashboardPage({ pathName }: TherapistPageProps) {
  return (
    <div className="flex gap-4 flex-col text-center bg-white bg-opacity-50 rounded-3xl py-4 justify-center md:justify-start items-center md:items-start w-full md:px-8 md:py-6 md:min-h-screen">
      <p className="text-2xl font-semibold italic mb-2 ">
        {getTherapistPageTitle(pathName)}
      </p>

      <TherapistDashboardTable />
    </div>
  );
}
