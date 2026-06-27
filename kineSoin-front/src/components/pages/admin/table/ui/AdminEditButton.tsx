import { Link } from 'react-router-dom';
import editIcon from '/icons/edit.png';

interface Props {
  link: string;
}

export default function AdminEditButton({ link }: Props) {
  return (
    <Link
      to={link}
      className="flex items-center justify-center gap-1 hover:scale-110"
    >
      <img src={editIcon} alt="edit" className="w-5 h-5" />

      <span className="hidden md:block text-blue-300 font-semibold">
        Inspecter
      </span>
    </Link>
  );
}