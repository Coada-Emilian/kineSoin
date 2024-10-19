import { Link } from 'react-router-dom';

interface AdminSideNavProps {
  windowWidth: number;
}

export default function AdminSideNav({ windowWidth }: AdminSideNavProps) {
  return (
    <div className="m-4 border-r-2 w-fit border-r-lightGrey h-screen border-solid">
      <Link
        to="/admin/therapists"
        className="flex items-center justify-start w-3/4 h-12  text-primaryBlue"
      >
        <p>Tous les kinésithérapeutes</p>
      </Link>
      <Link
        to="/admin/patients"
        className="flex items-center justify-start w-3/4 h-12  text-primaryBlue"
      >
        <p>Tous les patients</p>
      </Link>
      <Link
        to="/admin/afflictions"
        className="flex items-center justify-start w-3/4 h-12  text-primaryBlue"
      >
        <p>Afflictions</p>
      </Link>
      <Link
        to="/admin/medics"
        className="flex items-center justify-start w-3/4 h-12  text-primaryBlue"
      >
        <p>Médecins</p>
      </Link>
      <Link
        to="/admin/insurances"
        className="flex items-center justify-start w-3/4 h-12  text-primaryBlue"
      >
        <p>Organismes d'assurance</p>
      </Link>
    </div>
  );
}
