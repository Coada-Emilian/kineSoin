import { IButtonDetails } from '../../../../@types/componentTypes';
import { buttonDetails } from './buttonDetails';

interface CustomButtonProps {
  details: IButtonDetails;
}

export default function CustomBtn({ details }: CustomButtonProps) {
  const background = buttonDetails.find(
    (btn) => btn.btnType === details.btnType
  )?.background;

  const btnClasses = `rounded-lg shadow-2xl ${background} 
  ${
    details.isNormalBtn
      ? 'py-2 px-1 min-w-16 md:min-w-24 my-0 mx-auto text-xs md:text-md xl:text-lg font-semibold'
      : details.isNavBtn
        ? 'p-2 max-w-36 lg:max-w-40 xl:max-w-44 m-0 text-xxs md:text-xs lg:text-sm font-medium'
        : details.isStatusBtn
          ? 'p-1 px-2 max-w-52 my-0 mx-0 text-xxs md:text-sm xl:text-base'
          : details.isMobileBtn
            ? 'p-2 max-w-36 lg:max-w-40 xl:max-w-44 m-0 text-xxs md:text-xs lg:text-sm'
            : ''
  }  `;

  //   const renderIcon = () => {
  //     if (patientNotificationButton || therapistNotificationButton) {
  //       return (
  //         <>
  //           <img src={NotificationIcon} alt="Notification" className="max-w-6" />
  //           {patientNotificationQuantity > 0 && (
  //             <div className="flex items-center">
  //               <p className="bg-red-600 px-1 md:px-2 rounded-full text-white text-xxs md:text-xxs flex items-center absolute top-1 left-8 md:left-7">
  //                 {patientNotificationQuantity
  //                   ? patientNotificationQuantity
  //                   : therapistNotificationQuantity
  //                     ? therapistNotificationQuantity
  //                     : ''}
  //               </p>
  //             </div>
  //           )}
  //         </>
  //       );
  //     } else if (
  //       patientLogoutButton ||
  //       adminLogoutButton ||
  //       therapistLogoutButton
  //     ) {
  //       return (
  //         <img
  //           src={LogoutIcon}
  //           alt="Logout"
  //           className="max-w-6 block md:hidden"
  //         />
  //       );
  //     }
  //     return null;
  //   };

  return (
    <button
      type={`${details.isFormBtn ? 'submit' : 'button'}`}
      onClick={details.onClick ? details.onClick : () => {}}
      className={btnClasses}
    >
      {/* {renderIcon()} */}
      <span className={``}>{details.btnText}</span>
    </button>
  );
}
