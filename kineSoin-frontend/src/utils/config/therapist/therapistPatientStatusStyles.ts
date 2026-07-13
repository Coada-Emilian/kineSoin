export const therapistPatientStatusConfig = {
  active: {
    label: 'Actif',
    background: 'bg-green-100',
    text: 'text-green-700',
    dot: 'bg-green-500',
  },
  inactive: {
    label: 'Inactif',
    background: 'bg-slate-100',
    text: 'text-slate-600',
    dot: 'bg-slate-400',
  },
  pending: {
    label: 'En attente',
    background: 'bg-yellow-100',
    text: 'text-yellow-700',
    dot: 'bg-yellow-500',
  },
  banned: {
    label: 'Banni',
    background: 'bg-red-100',
    text: 'text-red-700',
    dot: 'bg-red-500',
  },
} as const;
