import type { ActionButtonProps } from '../../../@types/props/componentProps';

export default function ActionButton({
  onClick,
  imgSrc,
  altText,
  isTimePassed,
  altImgSrc,
}: ActionButtonProps) {
  return (
    <button
      onClick={isTimePassed ? undefined : onClick}
      className={`${isTimePassed && altImgSrc ? 'bg-gray-200' : 'bg-teal-50 transition-all duration-150 hover:bg-teal-100 active:scale-95 cursor-pointer'} group flex h-9 w-9 items-center justify-center rounded-lg `}
    >
      <img
        src={isTimePassed && altImgSrc ? altImgSrc : imgSrc}
        alt={altText}
        className={`${isTimePassed && altImgSrc ? '' : 'transition-transform duration-150 group-hover:scale-110'} h-4 w-4 md:h-5 md:w-5`}
      />
    </button>
  );
}
