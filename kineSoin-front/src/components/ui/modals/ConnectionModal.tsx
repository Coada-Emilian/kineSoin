import { Link } from 'react-router-dom';

import type { ConnectionModalProps } from '../../../@types/props/customProps';
import { publicNavbarButtonDetails } from '../../../utils/constants/publicSection/layout/publicNavbarButtonDetails';
import { usePatientRegistrationContext } from '../../../utils/contexts/PatientRegistrationContext/usePatientRegistrationContext';
import CustomButton from '../buttons/CustomButton';
import BaseModal from './BaseModal';

export default function ConnectionModal({
  isOpen,
  onClose,
}: ConnectionModalProps) {
  const details = publicNavbarButtonDetails;

  const { setFormOrder } = usePatientRegistrationContext();

  const handleClick = () => {
    onClose();
    setFormOrder('first');
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="space-y-4 p-8 flex flex-col items-center">
        <h2 className="text-md md:text-xl font-bold mb-2 md:mb-4">
          Choisissez votre type de connexion
        </h2>
        {details.map((button, index) => (
          <Link
            key={index}
            to={button.to}
            onClick={handleClick}
            className="hidden md:block"
          >
            <CustomButton
              btn={{
                type: 'basic',
                text: button.text,
                style: 'hasIcon',
                onClick: handleClick,
                icon: button.icon,
              }}
            />
          </Link>
        ))}
      </div>
    </BaseModal>
  );
}
