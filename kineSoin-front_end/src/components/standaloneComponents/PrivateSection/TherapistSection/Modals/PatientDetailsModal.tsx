import { IModalProps } from '../../../../../@types/interfaces/customInterfaces';
import BaseModal from './BaseModal';

export default function PatientDetailsModal({ isOpen, onClose }: IModalProps) {
  //   const patientDetails = [
  //     {
  //       label: 'Statut',
  //       value:
  //         patientData?.status === 'active'
  //           ? 'ACTIF'
  //           : patientData?.status === 'banned'
  //             ? 'BANNI'
  //             : patientData?.status === 'pending'
  //               ? 'EN ATTENTE'
  //               : 'INACTIF',
  //     },

  //     {
  //       label: 'Adresse',
  //       value:
  //         patientData?.street_number +
  //         ' ' +
  //         patientData?.street_name +
  //         ', ' +
  //         patientData?.postal_code +
  //         ' ' +
  //         patientData?.city,
  //     },
  //     {
  //       label: 'N° de téléphone',
  //       value: patientData?.prefix + ' ' + patientData?.phone_number,
  //     },
  //     { label: 'Email', value: patientData?.email },
  //     { label: 'Date de naissance', value: patientData?.birth_date },
  //     { label: 'Mutuelle', value: patientData?.insurance[0].name },
  //   ];

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div>
        {/* {' '}
        <div className="w-full flex flex-col items-center  mb-6">
          <p className="text-lg md:text-xl ">
            <span className="font-normal">{patientData?.surname}</span>{' '}
            <span className="font-semibold">{patientData?.name}</span>
          </p>

          <p className="text-primaryBlue italic font-semibold">
            {patientData?.age} ans
          </p>
        </div>
        <div>
          {patientDetails.map((detail, index) => (
            <div
              key={index}
              className="flex justify-between px-4 py-1 text-xs md:text-lg"
            >
              <p className="w-1/2">{detail.label}</p>
              <p className="w-1/2 font-normal">{detail.value}</p>
            </div>
          ))}
        </div>{' '} */}
        <h1>PatientmODAL</h1>
      </div>
    </BaseModal>
  );
}
