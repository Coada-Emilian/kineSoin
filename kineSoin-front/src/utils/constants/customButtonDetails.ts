import adminLogo from '/icons/administrator.png';
import LogoutIcon from '/icons/logout.png';
import NotificationIcon from '/icons/notification.png';
import patientLogo from '/icons/patient.png';
import therapistLogo from '/icons/therapist.png';

export const customButtonTypeDetails = [
  {
    type: 'basic',
    background: 'bg-primaryTeal hover:bg-secondaryTeal',
  },
  {
    type: 'cancel',
    background: 'bg-gray-200 hover:bg-gray-400 ',
  },
  {
    type: 'modify',
    background: 'bg-blue-300 hover:bg-blue-500 ',
  },
  {
    type: 'delete',
    background: 'bg-red-300 hover:bg-red-500 ',
  },
  {
    type: 'active',
    background: 'bg-green-300 hover:bg-green-500',
  },
  {
    type: 'inactive',
    background: 'bg-gray-200 hover:bg-gray-400',
  },
  {
    type: 'add',
    background: 'bg-blue-200 hover:bg-blue-400',
  },
  {
    type: 'pending',
    background: 'bg-yellow-300 hover:bg-yellow-500',
  },
  {
    type: 'banned',
    background: 'bg-red-300 hover:bg-red-500',
  },
  {
    type: 'send',
    background: 'bg-blue-300 hover:bg-primaryBlue',
  },
];

export const customButtonIconDetails = [
  {
    name: 'notification',
    src: NotificationIcon,
    alt: 'Notification',
  },
  {
    name: 'logout',
    src: LogoutIcon,
    alt: 'Logout',
  },
  {
    name: 'admin',
    src: adminLogo,
    alt: 'Admin',
  },
  {
    name: 'patient',
    src: patientLogo,
    alt: 'Patient',
  },
  {
    name: 'therapist',
    src: therapistLogo,
    alt: 'Therapist',
  },
];
