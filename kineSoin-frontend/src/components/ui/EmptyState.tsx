import type { EmptyStateProps } from '../../@types/props/componentProps';

export default function EmptyState({
  title,
  description,
  children,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-gradient-to-b from-slate-50 to-white px-8 py-14 text-center">
      <h3 className="text-lg font-semibold text-slate-700">{title}</h3>

      <p className="mt-2 max-w-md text-sm text-slate-500">{description}</p>

      {children && <div className="mt-6">{children}</div>}
    </div>
  );
}
