import clsx from 'clsx';
import { Link } from 'react-router-dom';
import type { CustomButtonProps } from '../../../@types/props/componentProps';
import {
  customButtonIconDetails,
  customButtonTypeDetails,
} from '../../../utils/constants/customButtonDetails';

export default function CustomButton({ btn, type }: CustomButtonProps) {
  const background = customButtonTypeDetails.find(
    (button) => button.type === btn.type
  )?.background;

  const baseStyles = clsx(
    'rounded-xl shadow-2xl text-primaryBlue shadow-sm transition-all duration-200 ease-out hover:text-white hover:shadow-md hover:-translate-y-0.5 active:scale-95  font-medium cursor-pointer text-slate-700',
    background,
    btn.hasBorder && 'border border-slate-200'
  );

  const sizeStyles = {
    compact: 'p-1 px-2',
    normal: 'p-2',
    wide: 'p-2 flex items-center justify-center gap-2 hover:text-black hover:scale-110 transition-all duration-300 ease-in-out',
  };

  const widthStyles = 'max-w-36 lg:max-w-40 xl:max-w-44';

  const textSizes = {
    xs: 'text-xxs md:text-xs lg:text-sm',
    sm: 'text-xs md:text-sm lg:text-base',
    md: 'text-sm md:text-base lg:text-lg',
    lg: 'text-base md:text-lg xl:text-xl',
  };

  const btnClasses = clsx(
    baseStyles,
    {
      normal: `${sizeStyles.normal} ${textSizes.md}`,
      nav: `${sizeStyles.normal} ${widthStyles} ${textSizes.sm}`,
      status: `${sizeStyles.compact} ${widthStyles} ${textSizes.sm}`,
      mobile: `${sizeStyles.normal} ${widthStyles} ${textSizes.xs}`,
      hasIcon: `${sizeStyles.wide} w-36 lg:w-40 xl:w-44 ${textSizes.sm}`,
    }[btn.style]
  );

  const iconDetails = customButtonIconDetails.find(
    (icon) => icon.name === btn.icon
  );

  const renderIcon = () => {
    if (!iconDetails) return null;

    return (
      <img
        src={iconDetails.src}
        alt={iconDetails.alt}
        className={clsx(
          'w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7',
          iconDetails.name === 'logout' && 'block md:hidden'
        )}
      />
    );
  };

  const textClasses = clsx(btn.icon === 'logout' && 'hidden md:inline');

  return btn.to ? (
    <Link to={btn.to} className={btnClasses}>
      {btn.text}
    </Link>
  ) : (
    <button
      type={type ?? 'button'}
      onClick={btn.onClick ?? (() => {})}
      className={btnClasses}
    >
      {renderIcon()}
      <span className={textClasses}>{btn.text}</span>
    </button>
  );
}
