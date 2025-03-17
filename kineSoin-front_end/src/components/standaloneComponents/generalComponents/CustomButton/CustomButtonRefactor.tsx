import { IButtonDetails } from '../../../../@types/componentTypes';
import { buttonDetails } from './buttonDetails';
import NotificationIcon from '/icons/notification.png';
import LogoutIcon from '/icons/logout.png';
import clsx from 'clsx';

interface CustomButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  btn: IButtonDetails;
}

export default function CustomBtn({ btn, type }: CustomButtonProps) {
  const background = buttonDetails.find(
    (button) => button.btnType === btn.type
  )?.background;

  const hasBorder = btn.hasBorder ?? false;

  const btnClasses = clsx(
    `rounded-lg shadow-2xl text-primaryBlue hover:text-white ${background} ${hasBorder && 'border border-2 border-white'} `,
    btn.style === 'normal' &&
      'p-2 min-w-16 md:min-w-24 text-xs md:text-md xl:text-lg font-semibold',
    btn.style === 'nav' &&
      'p-2 max-w-36 lg:max-w-40 xl:max-w-44 m-0 text-xxs md:text-xs lg:text-sm font-medium',
    btn.style === 'status' &&
      'p-1 px-2 max-w-52 my-0 mx-0 text-xxs md:text-sm xl:text-base font-medium',
    btn.style === 'mobile' &&
      'p-2 max-w-36 lg:max-w-40 xl:max-w-44 m-0 text-xxs md:text-xs lg:text-sm'
  );

  const renderIcon = () => {
    if (btn.icon === 'notification') {
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
    }
    if (btn.icon === 'logout') {
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
      type={type ?? 'button'}
      onClick={btn.onClick ? btn.onClick : () => {}}
      className={btnClasses}
    >
      {renderIcon()}
      <span className={`${btn.icon === 'logout' && 'hidden md:inline'}`}>
        {btn.text}
      </span>
    </button>
  );
}
