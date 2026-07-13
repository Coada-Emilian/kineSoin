import type { ActionButtonProps } from '../../../@types/props/componentProps';

export default function ActionButton({
  onClick,
  imgSrc,
  altText,
}: ActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className="group flex h-9 w-9 items-center justify-center rounded-lg bg-teal-50 transition-all duration-150 hover:bg-teal-100 active:scale-95 cursor-pointer"
    >
      <img
        src={imgSrc}
        alt={altText}
        className="h-4 w-4 md:h-5 md:w-5 transition-transform duration-150 group-hover:scale-110"
      />
    </button>
  );
}
