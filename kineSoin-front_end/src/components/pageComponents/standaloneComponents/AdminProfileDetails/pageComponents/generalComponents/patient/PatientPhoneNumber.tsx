import { IPatient } from '../../../../../../../@types/IPatient';

interface PatientTherapistProps {
  patient: IPatient;
}

export default function PatientPhoneNumber({ patient }: PatientTherapistProps) {
  return (
    <section className="mb-2 md:text-2xl">
      <div className="md:text-2xl">
        <h4 className="font-bold ">Téléphone :</h4>
        <span className="italic font-normal">{patient.phone_number}</span>
      </div>
    </section>
  );
}
