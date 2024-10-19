import { Link } from 'react-router-dom';

export default function AdminSideNav() {
  const links = [
    { name: 'Tous les kinésithérapeutes', path: '/admin/therapists' },
    { name: 'Tous les patients', path: '/admin/patients' },
    { name: 'Afflictions', path: '/admin/afflictions' },
    { name: 'Médecins', path: '/admin/medics' },
    { name: "Organismes d'assurance", path: '/admin/insurances' },
  ];

  return (
    <div className="m-4 border-r-2 w-fit border-r-lightGrey h-screen border-solid">
      {links.map((link) => (
        <Link
          to={link.path}
          className="flex items-center justify-start w-3/4 h-12  text-primaryBlue"
        >
          <p>{link.name}</p>
        </Link>
      ))}
    </div>
  );
}
