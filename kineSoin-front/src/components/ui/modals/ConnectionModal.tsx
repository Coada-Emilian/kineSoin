import { Link } from 'react-router-dom';
import type { ConnectionModalProps } from '../../../@types/props/modalProps';
import type { IButtonIcon } from '../../../@types/types/buttonTypes';
import { publicNavbarButtonDetails } from '../../../utils/constants/publicSection/layout/publicNavbarButtonDetails';
import { usePatientRegistrationContext } from '../../../utils/functions/contextUtils/usePatientRegistrationContext';
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
    <BaseModal isOpen={isOpen} onClose={onClose} variant="compact" size="md">
      <h2 className="text-xl md:text-2xl font-semibold text-primaryBlue italic">
        Choisissez votre espace
      </h2>

      <p className="text-sm text-gray-500 mt-2">
        Sélectionnez votre type de connexion
      </p>

      <div className="w-full flex flex-col gap-4">
        {details.map((button) => (
          <Link
            key={button.to}
            to={button.to}
            onClick={handleClick}
            className="w-full flex justify-center"
          >
            <CustomButton
              btn={{
                type: 'basic',
                text: button.text,
                style: 'hasIcon',
                icon: button.icon as IButtonIcon,
              }}
            />
          </Link>
        ))}
      </div>
    </BaseModal>
  );
}
