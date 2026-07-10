import type { TherapistHeaderProps } from '../../../@types/props/therapistProps';
import { getTherapistPageHeader } from '../../../utils/functions/therapist/getTherapistPageHeader';

export default function TherapistHeader({ page }: TherapistHeaderProps) {
  const { title, subtitle } = getTherapistPageHeader(page);

  return (
    <header className="mb-6">
      <h2 className="text-2xl font-semibold text-slate-800">{title}</h2>

      {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
    </header>
  );
}
