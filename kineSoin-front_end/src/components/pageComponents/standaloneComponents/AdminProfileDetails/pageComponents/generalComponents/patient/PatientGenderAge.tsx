import { IPatient } from '../../../../../../../@types/IPatient';

interface PatientGenderAgeProps {
  patient: IPatient;
}

export default function PatientGenderAge({ patient }: PatientGenderAgeProps) {
  return (
    <section className="mb-2 md:text-2xl">
      <div className="flex gap-6 items-center">
        <div className="md:text-2xl flex gap-1 items-center">
          <h4 className="font-bold ">Age :</h4>
          <span className="italic font-normal">{patient.age}</span>
        </div>
        <div className="flex gap-1 items-center">
          <h4 className="font-bold">Genre :</h4>
          <span className="italic font-normal">{patient.gender}</span>
        </div>
      </div>
    </section>
  );
}
