import { Button } from '@headlessui/react';
import deleteIcon from '/icons/delete.png';

interface Props {
  onDelete: () => void;
}

export default function AdminDeleteButton({ onDelete }: Props) {
  return (
    <Button
      onClick={onDelete}
      className="mx-auto flex items-center justify-center gap-1 hover:scale-110 cursor-pointer"
    >
      <img src={deleteIcon} alt="delete" className="w-5" />

      <span className="hidden md:block text-red-600 font-semibold">
        Supprimer
      </span>
    </Button>
  );
}
