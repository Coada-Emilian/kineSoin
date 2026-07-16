import type { ReactNode } from 'react';

export default function TherapistCard({
  title,
  subtitle,
  children,
  padded,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  padded?: boolean;
}) {
  return (
    <section className="w-full overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
      <header className="border-b border-slate-200 px-6 py-5">
        <h3 className="text-lg font-semibold text-slate-800">{title}</h3>

        {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
      </header>

      <div className={padded ? 'p-6' : ''}>{children}</div>
    </section>
  );
}
