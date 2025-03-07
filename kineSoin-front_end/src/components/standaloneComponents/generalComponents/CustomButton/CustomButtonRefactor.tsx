import { IButtonDetails } from '../../../../@types/componentTypes';
import { buttonDetails } from './buttonDetails';
import NotificationIcon from '/icons/notification.png';
import LogoutIcon from '/icons/logout.png';

interface CustomButtonProps {
  btn: IButtonDetails;
}

export default function CustomBtn({ btn }: CustomButtonProps) {
  const background = buttonDetails.find(
    (button) => button.btnType === btn.btnType
  )?.background;

  const btnClasses = `rounded-lg shadow-2xl ${background} 
  ${
    btn.isNormalBtn
      ? 'py-2 px-1 min-w-16 md:min-w-24 my-0 mx-auto text-xs md:text-md xl:text-lg font-semibold'
      : btn.isNavBtn
        ? 'p-2 max-w-36 lg:max-w-40 xl:max-w-44 m-0 text-xxs md:text-xs lg:text-sm font-medium'
        : btn.isStatusBtn
          ? 'p-1 px-2 max-w-52 my-0 mx-0 text-xxs md:text-sm xl:text-base font-medium'
          : btn.isMobileBtn
            ? 'p-2 max-w-36 lg:max-w-40 xl:max-w-44 m-0 text-xxs md:text-xs lg:text-sm'
            : ''
  }  `;

  const renderIcon = () => {
    if (btn.isNotificationBtn) {
      return (
        <>
          <img src={NotificationIcon} alt="Notification" className="max-w-6" />
          {/* {patientNotificationQuantity > 0 && (
            <div className="flex items-center">
              <p className="bg-red-600 px-1 md:px-2 rounded-full text-white text-xxs md:text-xxs flex items-center absolute top-1 left-8 md:left-7">
                {patientNotificationQuantity
                  ? patientNotificationQuantity
                  : therapistNotificationQuantity
                    ? therapistNotificationQuantity
                    : ''}
              </p>
            </div>
          )} */}
        </>
      );
    } else if (btn.isLogoutBtn) {
      return (
        <img
          src={LogoutIcon}
          alt="Logout"
          className="max-w-6 block md:hidden"
        />
      );
    }
  };

  return (
    <button
      type={`${btn.isFormBtn ? 'submit' : 'button'}`}
      onClick={btn.onClick ? btn.onClick : () => {}}
      className={btnClasses}
    >
      {renderIcon()}
      <span className={`hidden md:inline`}>{btn.btnText}</span>
    </button>
  );
}
