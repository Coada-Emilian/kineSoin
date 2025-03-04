import NotificationIcon from '/icons/notification.png';
import LogoutIcon from '/icons/logout.png';

interface CustomButtonProps {
  btnText?: string | JSX.Element;
  normalButton?: boolean;
  cancelButton?: boolean;
  validateButton?: boolean;
  modifyButton?: boolean;
  deleteButton?: boolean;
  activeButton?: boolean;
  inactiveButton?: boolean;
  pendingButton?: boolean;
  bannedButton?: boolean;
  navBarButton?: boolean;
  addButton?: boolean;
  allButton?: boolean;
  btnType?: 'button' | 'submit' | 'reset';
  patientNotificationButton?: boolean;
  patientLogoutButton?: boolean;
  adminLogoutButton?: boolean;
  onClick?: () => void;
  patientNotificationQuantity?: number;
  setPatientNotificationQuantity?: React.Dispatch<React.SetStateAction<number>>;
  mobileButton?: boolean;
  mobileDeleteButton?: boolean;
  mobileCancelButton?: boolean;
  profileCardSendMessageButton?: boolean;
  profileCardModifyProfileButton?: boolean;
  profileCardAddInsuranceButton?: boolean;
  therapistNotificationButton?: boolean;
  therapistNotificationQuantity?: number;
  setTherapistNotificationQuantity?: React.Dispatch<
    React.SetStateAction<number>
  >;
  therapistLogoutButton?: boolean;
}

export default function CustomButton({
  btnText,
  normalButton,
  cancelButton,
  validateButton,
  modifyButton,
  deleteButton,
  activeButton,
  inactiveButton,
  pendingButton,
  bannedButton,
  navBarButton,
  addButton,
  allButton,
  btnType,
  adminLogoutButton,
  onClick,
  mobileButton,
  mobileDeleteButton,
  mobileCancelButton,
  profileCardSendMessageButton,
  profileCardModifyProfileButton,
  profileCardAddInsuranceButton,
  patientNotificationButton,
  patientLogoutButton,
  patientNotificationQuantity = 0,
  setPatientNotificationQuantity,
  therapistNotificationButton,
  therapistNotificationQuantity = 0,
  setTherapistNotificationQuantity,
  therapistLogoutButton,
}: CustomButtonProps) {
  const getBtnBackground = () => {
    if (normalButton || navBarButton || mobileButton || allButton) {
      return 'bg-primaryTeal hover:bg-secondaryTeal';
    } else if (cancelButton || mobileCancelButton) {
      return 'bg-gray-300 hover:bg-gray-300';
    } else if (modifyButton) {
      return 'bg-blue-300 hover:bg-blue-500';
    } else if (deleteButton || mobileDeleteButton) {
      return 'bg-red-300 hover:bg-red-500';
    } else if (activeButton) {
      return 'bg-green-300 hover:bg-green-500';
    } else if (inactiveButton) {
      return 'bg-gray-200 hover:bg-gray-400';
    } else if (addButton) {
      return 'bg-blue-200 hover:bg-blue-400';
    } else if (pendingButton) {
      return 'bg-yellow-300 hover:bg-yellow-500';
    } else if (bannedButton) {
      return 'bg-red-300 hover:bg-red-500';
    } else if (
      patientNotificationButton ||
      patientLogoutButton ||
      therapistLogoutButton ||
      therapistNotificationButton
    ) {
      return 'md:bg-primaryTeal md:hover:bg-secondaryTeal';
    } else if (profileCardSendMessageButton || profileCardModifyProfileButton) {
      return 'bg-primaryBlue hover:bg-gray-500';
    }
  };

  const getSizeAndPadding = () => {
    if (
      normalButton ||
      cancelButton ||
      validateButton ||
      modifyButton ||
      deleteButton
    ) {
      return 'text-xs md:text-md xl:text-xl p-2 py-2 min-w-24 my-0 mx-auto shadow-2xl';
    } else if (
      activeButton ||
      inactiveButton ||
      allButton ||
      pendingButton ||
      bannedButton
    ) {
      return 'text-xxs md:text-sm xl:text-base p-1 px-2 max-w-52 my-0 mx-0 shadow-2xl';
    } else if (addButton) {
      return 'text-xxs md:text-sm xl:text-base p-1 px-2 max-w-52 my-0 mx-0 shadow-2xl';
    } else if (
      navBarButton ||
      patientNotificationButton ||
      therapistNotificationButton ||
      patientLogoutButton ||
      therapistLogoutButton ||
      mobileButton ||
      mobileDeleteButton ||
      mobileCancelButton
    ) {
      return 'text-xxs md:text-xs lg:text-sm px-2 py-2 max-w-36 lg:max-w-40 xl:max-w-44 my-0 mx-0 shadow-2xl';
    } else if (profileCardSendMessageButton || profileCardModifyProfileButton) {
      return 'text-xxs md:text-xs lg:text-sm px-2 py-2 max-w-36 lg:max-w-40 xl:max-w-44 my-0 mx-0 shadow-2xl text-white';
    }
  };

  const btnClasses = `rounded-lg text-primaryBlue ${profileCardAddInsuranceButton ? 'hover:text-primaryTeal italic' : 'hover:text-white'} font-bold black ${getBtnBackground()} ${getSizeAndPadding()} ${(patientNotificationButton || patientLogoutButton || therapistNotificationButton || therapistLogoutButton) && 'flex items-center gap-2 relative'}`;

  const renderIcon = () => {
    if (patientNotificationButton || therapistNotificationButton) {
      return (
        <>
          <img src={NotificationIcon} alt="Notification" className="max-w-6" />
          {patientNotificationQuantity > 0 && (
            <div className="flex items-center">
              <p className="bg-red-600 px-1 md:px-2 rounded-full text-white text-xxs md:text-xxs flex items-center absolute top-1 left-8 md:left-7">
                {patientNotificationQuantity
                  ? patientNotificationQuantity
                  : therapistNotificationQuantity
                    ? therapistNotificationQuantity
                    : ''}
              </p>
            </div>
          )}
        </>
      );
    } else if (
      patientLogoutButton ||
      adminLogoutButton ||
      therapistLogoutButton
    ) {
      return <img src={LogoutIcon} alt="Logout" className="max-w-6" />;
    }
    return null;
  };

  return (
    <button type={btnType} onClick={onClick} className={btnClasses}>
      {renderIcon()}
      <span
        className={
          patientLogoutButton ||
          patientNotificationButton ||
          therapistLogoutButton ||
          therapistNotificationButton
            ? 'hidden md:block'
            : undefined
        }
      >
        {btnText}
      </span>
    </button>
  );
}
