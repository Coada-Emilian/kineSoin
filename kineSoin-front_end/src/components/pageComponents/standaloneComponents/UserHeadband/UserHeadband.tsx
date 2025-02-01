import { useEffect, useState } from 'react';
import { getPatientTokenAndDataFromLocalStorage } from '../../../../localStorage/patientLocalStorage';

interface UserHeadbandProps {
  isPatientHeadband?: boolean;
}

export default function UserHeadband({ isPatientHeadband }: UserHeadbandProps) {
  const [patientFullName, setPatientFullName] = useState('');
  const [patientPictureUrl, setPatientPictureUrl] = useState('');
  useEffect(() => {
    const response = getPatientTokenAndDataFromLocalStorage();
    if (response) {
      setPatientFullName(response.fullName || '');
      setPatientPictureUrl(response.picture_url || '');
    }
  }, []);
  return (
    <div className="flex justify-around md:justify-start md:gap-5 md:px-10 bg-gray-200 p-5 items-center ">
      <img
        src={isPatientHeadband ? patientPictureUrl : undefined}
        alt={isPatientHeadband ? patientFullName : undefined}
        className="w-16 h-16 md:w-24 md:h-24 xl:w-30 xl:h-30 rounded-full object-cover shadow-2xl"
      />
      <p className="text-primaryBlue text-sm font-semibold md:text-sm xl:text-base italic">
        Bienvenue {isPatientHeadband && patientFullName} !
      </p>
    </div>
  );
}
