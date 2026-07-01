import { Button } from '@headlessui/react';
import refreshIcon from '/icons/refresh.png';
import { adminTableStatusButtonDetails } from '../../../../../utils/config/admin/adminTableStatusButtonDetails';

interface Props {
  status: string;
  onStatusChange?: () => void;
}

export default function AdminStatusButton({ status, onStatusChange }: Props) {
  const buttonData = adminTableStatusButtonDetails.find(
    (button) => button.status === status
  );

  return (
    <div
      className={`flex items-center justify-center gap-1 font-medium px-4 py-3 ${
        buttonData?.background
      }`}
    >
      {onStatusChange && (
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
      )}

      <p>{`${buttonData?.text}`}</p>
    </div>
  );
}
