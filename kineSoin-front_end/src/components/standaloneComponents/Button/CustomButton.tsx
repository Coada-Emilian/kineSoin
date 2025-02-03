/**
 * @file CustomButton.tsx
 * @description A versatile button component that can render different styles and behaviors based on props.
 * The component supports various button types, including normal, cancel, validate, modify, delete, and status buttons
 * such as active, inactive, pending, and banned. It allows customization of button text, click behavior, and styles.
 *
 * @interface ButtonProps
 * @param {string} btnText - The text to display on the button.
 * @param {boolean} [normalButton] - If true, applies the normal button style.
 * @param {boolean} [cancelButton] - If true, applies the cancel button style.
 * @param {boolean} [validateButton] - If true, applies the validate button style.
 * @param {boolean} [modifyButton] - If true, applies the modify button style.
 * @param {boolean} [deleteButton] - If true, applies the delete button style.
 * @param {boolean} [activeButton] - If true, applies the active button style.
 * @param {boolean} [inactiveButton] - If true, applies the inactive button style.
 * @param {boolean} [pendingButton] - If true, applies the pending button style.
 * @param {boolean} [bannedButton] - If true, applies the banned button style.
 * @param {boolean} [addButton] - If true, applies the add button style.
 * @param {boolean} [allButton] - If true, applies the all button style.
 * @param {string} [btnType] - The type of the button, can be 'button', 'submit', or 'reset'. Defaults to 'button'.
 * @param {function} [onClick] - The function to call when the button is clicked.
 *
 * @returns {JSX.Element} The rendered CustomButton component with appropriate styles and behavior.
 */

import NotificationIcon from '/icons/notification.png';
import LogoutIcon from '/icons/logout.png';

interface ButtonProps {
  btnText?: string | JSX.Element;
  normalButton?: boolean;
  cancelButton?: boolean;
  validateButton?: boolean;
  modifyButton?: boolean;
  deleteButton?: boolean;
  activeButton?: boolean;
  addButton?: boolean;
  allButton?: boolean;
  inactiveButton?: boolean;
  pendingButton?: boolean;
  bannedButton?: boolean;
  navBarButton?: boolean;
  patientNotificationButton?: boolean;
  patientLogoutButton?: boolean;
  adminLogoutButton?: boolean;
  onClick?: () => void;
  btnType?: 'button' | 'submit' | 'reset';
  patientNotificationQuantity?: number;
  setPatientNotificationQuantity?: React.Dispatch<React.SetStateAction<number>>;
  mobileButton?: boolean;
  mobileDeleteButton?: boolean;
  mobileCancelButton?: boolean;
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
  patientNotificationButton,
  patientLogoutButton,
  adminLogoutButton,
  onClick,
  patientNotificationQuantity,
  setPatientNotificationQuantity,
  mobileButton,
  mobileDeleteButton,
  mobileCancelButton,
}: ButtonProps) {
  // Function to determine the button background color based on props
  const getBtnBackground = () => {
    if (normalButton || navBarButton || mobileButton) {
      return 'bg-primaryTeal hover:bg-secondaryTeal';
    } else if (cancelButton || mobileCancelButton) {
      return 'bg-gray-200 hover:bg-gray-300';
    } else if (modifyButton) {
      return 'bg-blue-300 hover:bg-blue-500';
    } else if (deleteButton || mobileDeleteButton) {
      return 'bg-red-300 hover:bg-red-500';
    } else if (activeButton) {
      return 'bg-green-300 hover:bg-green-500';
    } else if (inactiveButton) {
      return 'bg-gray-200 hover:bg-gray-400';
    } else if (allButton) {
      return 'bg-primaryTeal hover:bg-secondaryTeal';
    } else if (addButton) {
      return 'bg-blue-200 hover:blue-400';
    } else if (pendingButton) {
      return 'bg-yellow-300 hover:bg-yellow-500';
    } else if (bannedButton) {
      return 'bg-red-300 hover:bg-red-500';
    } else if (patientNotificationButton || patientLogoutButton) {
      return 'md:bg-primaryTeal md:hover:bg-secondaryTeal';
    }
  };

  // Function to determine the button size and padding based on props
  const getSizeAndPadding = () => {
    if (
      normalButton ||
      cancelButton ||
      validateButton ||
      modifyButton ||
      deleteButton
    ) {
      return 'text-sm md:text-xl xl:text-base p-4 py-2 min-w-24 my-0 mx-auto';
    } else if (
      activeButton ||
      inactiveButton ||
      allButton ||
      pendingButton ||
      bannedButton
    ) {
      return 'text-xxs md:text-sm xl:text-base p-1 px-2 max-w-52 my-0 mx-0';
    } else if (addButton) {
      return 'text-xxs md:text-sm xl:text-base p-1 px-2 max-w-52 my-0 mx-0';
    } else if (
      navBarButton ||
      patientNotificationButton ||
      patientLogoutButton ||
      mobileButton ||
      mobileDeleteButton ||
      mobileCancelButton
    ) {
      return 'text-xxs md:text-xs lg:text-sm  px-2 py-2 max-w-36 lg:max-w-40 xl:max-w-44 my-0 mx-0';
    }
  };

  // Determine the button classes based on props
  const btnClasses = `rounded-lg text-primaryBlue hover:text-white font-bold black ${getBtnBackground()} ${getSizeAndPadding()} ${(patientNotificationButton || patientLogoutButton) && 'flex items-center gap-2 relative'}`;

  // Icons for patient notification and logout buttons
  const patientNotificationIcon = (
    <>
      <img src={NotificationIcon} alt="Notification" className="max-w-8" />
      {patientNotificationQuantity && patientNotificationQuantity > 0 ? (
        <div className="flex items-center">
          <p className="bg-red-600 px-1 md:px-2 rounded-full text-white text-xxs md:text-xxs flex items-center absolute top-1 left-8 md:left-7">
            {patientNotificationQuantity}
          </p>
        </div>
      ) : (
        <></>
      )}
    </>
  );

  // Icon for patient logout button
  const logoutIcon = <img src={LogoutIcon} alt="Logout" className="max-w-8" />;

  return (
    <button type={btnType} onClick={onClick} className={btnClasses}>
      <>
        {patientNotificationButton && patientNotificationIcon}
        {patientLogoutButton && logoutIcon}
        {adminLogoutButton && logoutIcon}
        <span
          className={
            patientLogoutButton || patientNotificationButton
              ? 'hidden md:block'
              : undefined
          }
        >
          {btnText}
        </span>
      </>
    </button>
  );
}
