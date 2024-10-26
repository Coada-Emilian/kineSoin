/**
 * @file AdminSideNav.tsx
 * @description A React functional component that renders a side navigation menu for
 * the admin section of the KineSoin application. This component provides navigation links
 * to different administrative sections, including therapists, patients, afflictions,
 * medics, and insurance organizations. Each link changes style based on its active state.
 *
 * @returns {JSX.Element} The rendered AdminSideNav component, which includes
 * navigation links for the admin panel.
 */

import { NavLink } from 'react-router-dom';

export default function AdminSideNav() {
  const links = [
    { name: 'Tous les kinésithérapeutes', path: '/admin/therapists' },
    { name: 'Tous les patients', path: '/admin/patients' },
    { name: 'Afflictions', path: '/admin/afflictions' },
    { name: 'Médecins', path: '/admin/medics' },
    { name: "Organismes d'assurance", path: '/admin/insurances' },
  ];

  return (
    <div className="mx-4">
      {links.map((link) => (
        <NavLink
          to={link.path}
          className={({ isActive }) =>
            `flex items-center justify-start my-2 ${
              isActive
                ? 'text-secondaryBlue font-bold italic'
                : 'text-primaryBlue'
            }`
          }
          key={link.name}
        >
          <p className="hover:text-secondaryBlue focus:text-red-500 text-lg">
            {link.name}
          </p>
        </NavLink>
      ))}
    </div>
  );
}
