interface ButtonProps {
  btnText: string;
  normalBtn?: boolean;
  onClick?: () => void;
  btnType?: 'button' | 'submit' | 'reset';
}

export default function CustomButton({
  btnText,
  normalBtn,
  btnType,
  onClick,
}: ButtonProps) {
  const getBtnBackground = () => {
    if (normalBtn) {
      return 'bg-primaryTeal hover:bg-secondaryTeal';
    }
  };

  const getSizeAndPadding = () => {
    if (normalBtn) {
      return 'text-sm p-4 min-w-24 my-0';
    }
  };

  const btnClasses = `rounded-lg text-primaryBlue hover:text-white font-bold py-2 black mx-auto ${getBtnBackground()} ${getSizeAndPadding()}`;

  return (
    <button type={btnType} onClick={onClick} className={btnClasses}>
      {btnText}
    </button>
  );
}
