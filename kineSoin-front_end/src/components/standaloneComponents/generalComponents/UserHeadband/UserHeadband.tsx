import { useEffect, useState } from 'react';
import { getPatientTokenAndDataFromLocalStorage } from '../../../../localStorage/patientLocalStorage';
import { getTherapistTokenAndDataFromLocalStorage } from '../../../../localStorage/therapistLocalStorage';
import { Link } from 'react-router-dom';

interface UserHeadbandProps {
  isPatientHeadband?: boolean;
  isTherapistHeadband?: boolean;
  windowWidth?: number;
}

export default function UserHeadband({
  isPatientHeadband,
  isTherapistHeadband,
  windowWidth,
}: UserHeadbandProps) {
  const [patientFullName, setPatientFullName] = useState<string>('');
  const [patientPictureUrl, setPatientPictureUrl] = useState<string>('');

  const [therapistFullName, setTherapistFullName] = useState<string>('');
  const [therapistPictureUrl, setTherapistPictureUrl] = useState<string>('');

  useEffect(() => {
    if (isPatientHeadband) {
      const response = getPatientTokenAndDataFromLocalStorage();
      if (response) {
        setPatientFullName(response.fullName || '');
        setPatientPictureUrl(response.picture_url || '');
      }
    } else if (isTherapistHeadband) {
      const response = getTherapistTokenAndDataFromLocalStorage();
      if (response) {
        setTherapistFullName(response.fullName || '');
        setTherapistPictureUrl(response.picture_url || '');
      }
    }
  }, [isPatientHeadband, isTherapistHeadband]);

  return (
    <div className="flex justify-around md:justify-start md:gap-5 md:px-10 bg-gray-200 p-5 items-center ">
      <Link
        to={`${isTherapistHeadband ? '/therapist/my-profile' : isPatientHeadband ? '/patient/my-info' : '/'}`}
      >
        <img
          src={
            isPatientHeadband
              ? patientPictureUrl
              : isTherapistHeadband
                ? therapistPictureUrl
                : undefined
          }
          alt={
            isPatientHeadband
              ? patientFullName
              : isTherapistHeadband
                ? therapistFullName
                : undefined
          }
          className="w-16 h-16 md:w-24 md:h-24 xl:w-30 xl:h-30 rounded-full object-cover shadow-2xl"
        />
      </Link>
      <div className="flex flex-col gap-1 items-center">
        {' '}
        <p className="text-primaryBlue text-sm font-semibold md:text-sm xl:text-base italic">
          Bienvenue{' '}
          {isPatientHeadband
            ? patientFullName
            : isTherapistHeadband
              ? therapistFullName
              : ''}{' '}
          !
        </p>
        {windowWidth && windowWidth < 768 && (
          <Link
            to={`${isTherapistHeadband ? '/therapist/dashboard' : isPatientHeadband ? '/patient/dashboard' : '/'}`}
          >
            <p className="text-primaryBlue text-xs font-semibold md:text-sm xl:text-base italic">
              Revenir au tableau de bord
            </p>
          </Link>
        )}
      </div>
    </div>
  );
}
