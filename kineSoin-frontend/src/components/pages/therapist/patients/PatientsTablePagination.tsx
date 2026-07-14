interface PatientsTablePaginationProps {
  displayStart: number;
  displayEnd: number;
  displayTotal: number;

  currentPage: number;
  totalPages: number;

  rowsPerPage: number;

  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rows: number) => void;
}

export default function PatientsTablePagination({
  displayStart,
  displayEnd,
  displayTotal,
  currentPage,
  totalPages,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}: PatientsTablePaginationProps) {
  return (
    <div className="flex items-center justify-between border-t border-slate-200 px-6 py-4 bg-slate-50/50">
      <p className="text-sm text-slate-500">
        Affichage de{' '}
        <span className="font-semibold text-slate-700">{displayStart}</span> à{' '}
        <span className="font-semibold text-slate-700">{displayEnd}</span> sur{' '}
        <span className="font-semibold text-slate-700">{displayTotal}</span>{' '}
        {displayTotal > 1 ? 'patients' : 'patient'}
      </p>

      <div className="flex items-center justify-center gap-2">
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="h-9 w-9 rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:border-teal-500 hover:text-teal-600 disabled:opacity-40 cursor-pointer"
        >
          ←
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => onPageChange(index + 1)}
            className={`h-9 w-9 rounded-lg text-sm font-medium transition ${
              currentPage === index + 1
                ? 'bg-teal-600 text-white'
                : 'border border-slate-200 bg-white text-slate-600 hover:border-teal-500 hover:text-teal-600 cursor-pointer'
            }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="h-9 w-9 rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:border-teal-500 hover:text-teal-600 disabled:opacity-40 cursor-pointer"
        >
          →
        </button>
      </div>

      <select
        value={rowsPerPage}
        onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
        className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-xs outline-none transition hover:border-teal-500 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 cursor-pointer"
      >
        <option value={10}>10 par page</option>
        <option value={25}>25 par page</option>
        <option value={50}>50 par page</option>
      </select>
    </div>
  );
}
