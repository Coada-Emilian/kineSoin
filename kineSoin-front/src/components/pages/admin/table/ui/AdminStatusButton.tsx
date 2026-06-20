import { Button } from '@headlessui/react';
import refreshIcon from '/icons/refresh.png';

interface Props {
  status: string;
  onStatusChange: () => void;
}

export default function AdminStatusButton({ status, onStatusChange }: Props) {
  const isActive = status === 'active';

  return (
    <div
      className={`flex items-center justify-center gap-1 font-medium px-4 py-3 ${
        isActive ? 'bg-green-300' : 'bg-gray-200'
      }`}
    >
      <Button
        onClick={onStatusChange}
        className="hidden md:block cursor-pointer"
      >
        <img
          src={refreshIcon}
          alt="change status"
          className="w-5 hover:animate-spin"
        />
      </Button>

      <p>{isActive ? 'ACTIF' : 'INACTIF'}</p>
    </div>
  );
}
