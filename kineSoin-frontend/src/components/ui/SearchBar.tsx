interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

import searchIcon from '/icons/search.png';

export default function SearchBar({
  value,
  onChange,
  placeholder = 'Rechercher un patient...',
  className = '',
}: SearchBarProps) {
  return (
    <div className={`relative w-full md:max-w-md ${className}`}>
      <img
        src={searchIcon}
        alt="Search"
        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 opacity-60"
      />

      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-700 shadow-xs outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
      />
    </div>
  );
}
