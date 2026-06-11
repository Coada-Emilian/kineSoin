import adminLogo from '/icons/administrator.png';
import LogoutIcon from '/icons/logout.png';
import NotificationIcon from '/icons/notification.png';
import patientLogo from '/icons/patient.png';
import therapistLogo from '/icons/therapist.png';

export const customButtonTypeDetails = [
  {
    btnType: 'basic',
    background: 'bg-primaryTeal hover:bg-secondaryTeal',
  },
  {
    btnType: 'cancel',
    background: 'bg-gray-200 hover:bg-gray-400 ',
  },
  {
    btnType: 'modify',
    background: 'bg-blue-300 hover:bg-blue-500 ',
  },
  {
    btnType: 'delete',
    background: 'bg-red-300 hover:bg-red-500 ',
  },
  {
    btnType: 'active',
    background: 'bg-green-300 hover:bg-green-500',
  },
  {
    btnType: 'inactive',
    background: 'bg-gray-200 hover:bg-gray-400',
  },
  {
    btnType: 'add',
    background: 'bg-blue-200 hover:bg-blue-400',
  },
  {
    btnType: 'pending',
    background: 'bg-yellow-300 hover:bg-yellow-500',
  },
  {
    btnType: 'banned',
    background: 'bg-red-300 hover:bg-red-500',
  },
  {
    btnType: 'send',
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
