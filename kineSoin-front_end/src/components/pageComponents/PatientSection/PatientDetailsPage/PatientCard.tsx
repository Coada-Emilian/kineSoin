import { useEffect, useState } from 'react';
import CustomButton from '../../../standaloneComponents/Button/CustomButton';
import { fetchPatientData } from '../../../../utils/apiUtils';
import { IPatient } from '../../../../@types/IPatient';

interface PatientCardProps {
  patientId?: number;
}

export default function PatientCard({ patientId }: PatientCardProps) {
  const [patientData, setPatientData] = useState<IPatient | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (patientId !== undefined) {
        const response = await fetchPatientData(patientId);
        if (response) {
          setPatientData(response);
        } else {
          console.error('Error fetching patient data');
        }
      }
    };
    fetchData();
  }, [patientId]);

  useEffect(() => {
    console.log(patientData);
    console.log(patientData?.insurance?.[0]?.name);
  }, [patientData]);

  return (
    <>
      <div className="flex flex-col md:flex-row gap-1 md:gap-6 items-center w-full">
        {patientData && (
          <div className="w-2/4 flex justify-center">
            <img
              src={patientData.picture_url}
              alt={patientData.name}
              className="rounded-xl object-cover shadow-2xl"
            />
          </div>
        )}
        <div className="text-primaryBlue text-xs md:text-sm font-bold italic w-3/4 md:w-1/4 p-8 h-full flex flex-col justify-between gap-2 text-center">
          <div>
            <p className=" text-lg font-bold">
              {patientData?.fullName}, {patientData?.age} ans
            </p>
          </div>
          <div>
            <p className="mb-2">Adresse :</p>
            <p className="text-left p-2 border border-primaryBlue rounded-lg mb-2">
              {patientData?.street_number} {patientData?.street_name}
            </p>

            <div className="flex justify-between w-full gap-2">
              <p className="text-left p-2 border border-primaryBlue rounded-lg w-1/4">
                {patientData?.postal_code}
              </p>
              <p className="text-left p-2 border border-primaryBlue rounded-lg w-3/4">
                {patientData?.city}
              </p>
            </div>
          </div>

          <div>
            <p className=" mb-2">Numero telephone :</p>
            <p className="  text-left p-4 border border-primaryBlue rounded-lg mb-2">
              {patientData?.phone_number}
            </p>
          </div>
          <div>
            <p className=" mb-2">Assurance mutuelle :</p>
            <p className=" text-left p-4 border border-primaryBlue rounded-lg mb-2">
              {patientData?.insurance?.[0]?.name}
            </p>
          </div>
          {/* <div>
            <p className=" text-sm font-bold italic mb-2">Date de validite :</p>
            <div className="flex justify-between items-center w-full gap-2">
              <input
                type="date"
                name="start-date"
                className="border p-2 w-2/4 rounded-xl"
              />
              <p>au</p>
              <input
                type="date"
                name="end-date"
                className="border p-2 w-2/4 rounded-xl"
              />
            </div>
          </div> */}
          <div className="flex gap-2">
            <CustomButton btnText={'Ajouter mutuelle'} mobileButton />
            <CustomButton btnText="Éditer mon profil" mobileButton />
            <CustomButton btnText="Supprimer mon profil" mobileDeleteButton />
          </div>
        </div>
      </div>
    </>
  );
}
