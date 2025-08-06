import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

import { Button } from '@headlessui/react';
import { IPatientAppointmentDetails } from '../../../../../@types/interfaces/customInterfaces';
import { usePatientsContext } from '../../../../../utils/contexts/therapistSectionContext/PatientsContext';
import { useUIContext } from '../../../../../utils/contexts/therapistSectionContext/UIContext';
import BaseOutput from '../../../generalComponents/BaseOutput';
import CustomBtn from '../../../generalComponents/customButton/newComponents/CustomButtonRefactor';
import BaseModal from './BaseModal';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointment: IPatientAppointmentDetails;
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Disclosure>
      {({ open }) => (
        <div className="border rounded-xl mb-4 bg-white shadow">
          <Disclosure.Button className="flex w-full justify-between items-center px-4 py-2 text-left font-semibold text-primaryBlue bg-gray-100 hover:bg-gray-200 transition rounded-t-xl">
            <span>{title}</span>
            <ChevronDownIcon
              className={`w-5 h-5 transition-transform duration-200 ${
                open ? 'rotate-180' : ''
              }`}
            />
          </Disclosure.Button>
          <Disclosure.Panel className="p-4">{children}</Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  );
}

export default function AppointmentDetailsModal({
  isOpen,
  onClose,
  appointment,
}: ModalProps) {
  const { patientDetails: patient } = usePatientsContext();

  const { setIsCancelAppointmentModalOpen } = useUIContext();

  const handleCancelClick = () => {
    setIsCancelAppointmentModalOpen(true);
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      {/* Header */}
      <div className="bg-primaryBlue text-white py-8 px-6 md:py-10 md:px-8 rounded-t-xl w-full text-center">
        <p className="text-base md:text-lg mb-2">
          Cabinet kinésithérapie Ruffec
        </p>

        <p className="text-sm md:text-base text-center italic">
          Détails du Rendez-vous
        </p>
      </div>

      {/* Patient Photo */}
      <div className="bg-primaryTeal py-8 w-full flex flex-col items-center relative mb-14">
        <img
          src={patient?.picture_url || undefined}
          alt={patient?.name || undefined}
          className="w-24 h-24 object-cover rounded-full border-4 border-white absolute top-4"
        />
      </div>

      {/* RDV Section (Always visible) */}
      <div className="w-11/12 mx-auto">
        {' '}
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <BaseOutput
              label="Date"
              value={`${appointment.date} à ${appointment.time.split(':')[0]}h${appointment.time.split(':')[1]}`}
            />
            <BaseOutput
              label="Annulé ?"
              value={appointment.is_canceled ? 'Oui' : 'Non'}
            />
            <BaseOutput
              label="Accepté ?"
              value={appointment.is_accepted ? 'Oui' : 'Non'}
            />
          </div>
        </div>
        {/* Dropdown Sections */}
        <Section title="Thérapeute">
          <BaseOutput
            label="Nom"
            value={`${appointment.therapist.name} ${appointment.therapist.surname}`}
          />
        </Section>
        <Section title="Ordonnance">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <BaseOutput label="ID" value={appointment.prescription.id} />
            <BaseOutput label="Date" value={appointment.prescription.date} />
            <BaseOutput
              label="Séances prescrites"
              value={appointment.prescription.appointment_quantity}
            />
            <BaseOutput
              label="Séances complétées"
              value={appointment.prescription.completed_appointment_quantity}
            />
            <BaseOutput
              label="Soins à domicile"
              value={appointment.prescription.at_home_care ? 'Oui' : 'Non'}
            />
          </div>
          <Button className="mt-4 text-primaryBlue underline font-semibold text-sm hover:scale-105 transition-transform">
            Voir scan
          </Button>
        </Section>
        <Section title="Médecin prescripteur">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <BaseOutput
              label="Nom"
              value={`${appointment.prescription.medic.name} ${appointment.prescription.medic.surname}`}
            />
            <BaseOutput
              label="Email"
              value={appointment.prescription.medic.email}
            />
            <BaseOutput
              label="Téléphone"
              value={`${appointment.prescription.medic.prefix}${appointment.prescription.medic.phone_number}`}
            />
          </div>
        </Section>
        <Section title="Affection">
          <BaseOutput
            label="Nom"
            value={appointment.prescription.affliction.name}
          />
          <BaseOutput
            label="Description"
            value={appointment.prescription.affliction.description}
            isTextArea
          />
        </Section>
      </div>

      <div className="bg-primaryTeal p-4 w-full flex flex-col gap-4 md:flex-row justify-around items-center rounded-b-xl">
        <div className="flex gap-1 items-center ">
          <>
            <CustomBtn
              btn={{
                type: 'cancel',
                text: 'Retour',
                style: 'normal',
                hasBorder: true,
                onClick: onClose,
              }}
            />
            <CustomBtn
              btn={{
                type: 'delete',
                text: 'Annuler RDV',
                style: 'normal',
                hasBorder: true,
                onClick: handleCancelClick,
              }}
            />
          </>
        </div>
      </div>
    </BaseModal>
  );
}
