import { usePatientsContext } from '../../../../../utils/contexts/therapistSectionContext/PatientsContext';
import messageIcon from '/icons/message3.png';
import phoneIcon from '/icons/phone-call.png';

export default function TherapistPatientDetailsInteractiveButtons() {
  const { patientDetails } = usePatientsContext();

  return (
    <div className="bg-primaryBlue p-3 w-full flex items-center gap-4 justify-center">
      <div className="flex gap-2">
        <a
          href={`mailto:${patientDetails?.email}`}
          className="hover:animate-pulse hover:ease-in-out hover:delay-200 hover:scale-110"
        >
          <img src={messageIcon} alt="send mail" className="w-8 md:w-10" />
        </a>

        <a
          href={`tel:${patientDetails?.prefix}${patientDetails?.phone_number}`}
          className="hover:animate-pulse hover:ease-in-out hover:delay-200 hover:scale-110"
        >
          <img
            src={phoneIcon}
            alt="send mail"
            className="w-8 md:w-10 hover:animate-pulse hover:ease-in-out hover:delay-200 hover:scale-110"
          />
        </a>
      </div>

      <div>
        <p className="text-white italic">{`/ ${patientDetails?.name.toLowerCase()}.${patientDetails?.surname.toLowerCase()}`}</p>
      </div>
    </div>
  );
}
