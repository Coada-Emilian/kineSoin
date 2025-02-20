import { useEffect, useState } from 'react';
import { getPatientTokenAndDataFromLocalStorage } from '../../../../localStorage/patientLocalStorage';
import { getTherapistTokenAndDataFromLocalStorage } from '../../../../localStorage/therapistLocalStorage';
import { Link } from 'react-router-dom';

interface UserHeadbandProps {
  isPatientHeadband?: boolean;
  isTherapistHeadband?: boolean;
}

export default function UserHeadband({
  isPatientHeadband,
  isTherapistHeadband,
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
      <Link to={`${isTherapistHeadband ? '/therapist/dashboard' : '#'}`}>
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
      <p className="text-primaryBlue text-sm font-semibold md:text-sm xl:text-base italic">
        Bienvenue{' '}
        {isPatientHeadband
          ? patientFullName
          : isTherapistHeadband
            ? therapistFullName
            : ''}{' '}
        !
      </p>
    </div>
  );
}
