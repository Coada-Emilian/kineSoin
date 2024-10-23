import { IPatient } from '../../../../../../../@types/IPatient';

interface PatientAddressProps {
  patient: IPatient;
}

export default function PatientAddress({ patient }: PatientAddressProps) {
  return (
    <section className="mb-2 md:text-2xl">
      <div className="md:text-2xl">
        <h4 className="font-bold ">Adresse :</h4>
        <span className="italic font-normal">{patient.address}</span>
      </div>
    </section>
  );
}
