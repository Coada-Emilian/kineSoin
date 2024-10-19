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
    <div className="mx-4 ">
      {links.map((link) => (
        <Link
          to={link.path}
          className="flex items-center justify-start my-2"
          key={link.name}
        >
          <p className="text-primaryBlue hover:text-secondaryBlue">
            {link.name}
          </p>
        </Link>
      ))}
    </div>
  );
}
