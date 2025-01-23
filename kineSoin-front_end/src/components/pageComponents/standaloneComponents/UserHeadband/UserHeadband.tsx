import { useEffect, useState } from 'react';
import { getPatientTokenAndDataFromLocalStorage } from '../../../../localStorage/patientLocalStorage';

export default function UserHeadband() {
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
    <div className="flex justify-around bg-gray-200 p-5 items-center">
      <img
        src={patientPictureUrl}
        alt={patientFullName}
        className="w-16 h-16 rounded-full object-cover shadow-2xl"
      />
      <p className="text-xs italic">Bienvenue {patientFullName} !</p>
    </div>
  );
}
