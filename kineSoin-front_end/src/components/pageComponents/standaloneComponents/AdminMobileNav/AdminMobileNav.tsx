import { Icons } from 'react-toastify';
import afflictionIcon from '/icons/affliction.png';
import doctorIcon from '/icons/doctor.png';
import insuranceIcon from '/icons/insurance.png';
import patientIcon from '/icons/patient.png';
import therapistIcon from '/icons/therapist.png';
import { Link } from 'react-router-dom';
import path from 'path';

export default function AdminMobileNav() {
  const links = [
    {
      name: 'Kinés',
      path: '/admin/therapists',
      icon: therapistIcon,
    },
    {
      name: 'Patients',
      path: '/admin/patients',
      icon: patientIcon,
    },
    {
      name: 'Afflictions',
      path: '/admin/afflictions',
      icon: afflictionIcon,
    },
    {
      name: 'Médecins',
      path: '/admin/medics',
      icon: doctorIcon,
    },
    {
      name: 'Assurances',
      path: '/admin/insurances',
      icon: insuranceIcon,
    },
  ];

  return (
    <div className="flex gap-2 justify-around w-full">
      {links.map((link, index) => (
        <Link
          to={link.path}
          key={index}
          className=" flex flex-col items-center justify-center text-center"
        >
          <img src={link.icon} alt={link.name} className="w-10 mb-2" />
          <p className="text-sm font-medium">{link.name}</p>
        </Link>
      ))}
    </div>
  );
}
