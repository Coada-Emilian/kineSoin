import type { ReactNode } from 'react';
import type { StatisticCardVariant } from '../../../../@types/types/therapistTypes';

interface PatientStatisticCardProps {
  title: string;
  value: number;
  icon: ReactNode;
  variant: StatisticCardVariant;
}

export default function PatientStatisticCard({
  title,
  value,
  icon,
  variant,
}: PatientStatisticCardProps) {
  const variants = {
    teal: {
      bg: 'bg-teal-100',
      text: 'text-teal-600',
    },
    green: {
      bg: 'bg-green-100',
      text: 'text-green-600',
    },
    yellow: {
      bg: 'bg-amber-100',
      text: 'text-amber-600',
    },
    blue: {
      bg: 'bg-blue-100',
      text: 'text-blue-600',
    },
  };

  const activeVariant = variants[variant] || variants.teal;

  return (
    <div className="flex items-center gap-5 rounded-xl border border-gray-200 bg-white p-6 shadow-sm w-1/4">
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-xl ${activeVariant.bg} ${activeVariant.text}`}
      >
        {icon}
      </div>

      <div>
        <p className="text-3xl font-semibold text-gray-900">{value}</p>
        <p className="text-sm text-gray-500">{title}</p>
      </div>
    </div>
  );
}
