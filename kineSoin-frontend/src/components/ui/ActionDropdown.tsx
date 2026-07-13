import { MoreVertical } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { ActionDropdownProps } from '../../@types/props/componentProps';

export default function ActionDropdown({ actions }: ActionDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="group flex h-9 w-9 items-center justify-center rounded-lg bg-teal-50 transition-all duration-150 hover:bg-teal-100 active:scale-95 cursor-pointer"
      >
        <MoreVertical size={18} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-50 mt-2 w-48 rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
          {actions.map((action, index) => {
            if (action.separator) {
              return <hr key={index} className="my-1 border-gray-200" />;
            }

            return (
              <button
                key={action.label}
                type="button"
                onClick={() => {
                  action.onClick?.();
                  setIsOpen(false);
                }}
                className={`flex w-full items-center gap-3 px-4 py-2 text-left text-sm transition-colors hover:bg-gray-100 ${
                  action.danger
                    ? 'text-red-600 hover:bg-red-50'
                    : 'text-gray-700'
                }`}
              >
                {action.icon}
                <span>{action.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
