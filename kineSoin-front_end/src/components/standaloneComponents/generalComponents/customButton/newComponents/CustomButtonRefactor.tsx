import clsx from 'clsx';
import { IButtonDetails } from '../../../../../@types/interfaces/customInterfaces';
import { customButtonDetails } from '../../../../../utils/constants/publicSection/standaloneComponents/customButton/customButtonDetails';
import { customButtonIconDetails } from '../../../../../utils/constants/publicSection/standaloneComponents/customButton/customButtonIconDetails';

interface CustomButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  btn: IButtonDetails;
}

export default function CustomBtn({ btn, type }: CustomButtonProps) {
  const background = customButtonDetails.find(
    (button) => button.btnType === btn.type
  )?.background;

  const hasBorder = btn.hasBorder ?? false;

  const btnClasses = clsx(
    `rounded-lg shadow-2xl text-primaryBlue hover:text-white font-semibold ${background} ${hasBorder && 'border border-2 border-white'} `,
    btn.style === 'normal' &&
      'p-2 min-w-16 md:min-w-24 text-xs md:text-md xl:text-lg',
    btn.style === 'nav' &&
      'p-2 max-w-36 lg:max-w-40 xl:max-w-44 m-0 text-xxs md:text-xs lg:text-sm ',
    btn.style === 'status' &&
      'p-1 px-2 max-w-52 my-0 mx-0 text-xxs md:text-sm xl:text-base',
    btn.style === 'mobile' &&
      'p-2 max-w-36 lg:max-w-40 xl:max-w-44 m-0 text-xxs md:text-xs lg:text-sm',
    btn.style === 'hasIcon' &&
      'p-2 w-36 lg:w-40 xl:w-44 m-0 text-xxs md:text-xs lg:text-sm flex items-center justify-center gap-2 hover:text-black hover:scale-110 transition-all duration-300 ease-in-out'
  );

  const renderIcon = () => {
    const iconDetails = customButtonIconDetails.find(
      (icon) => icon.name === btn.icon
    );

    if (!iconDetails) return null;

    return (
      <img
        src={iconDetails.src}
        alt={iconDetails.alt}
        className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7"
      />
    );
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
