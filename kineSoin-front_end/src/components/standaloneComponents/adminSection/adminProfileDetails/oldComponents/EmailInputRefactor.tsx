interface EmailInputRefactorProps {
  entityType: string;
  setFunction: React.Dispatch<React.SetStateAction<string | undefined>>;
  value: string | undefined;
  type: string;
}

export default function EmailInputRefactor({
  entityType,
  setFunction,
  value,
  type,
}: EmailInputRefactorProps) {
  const getId = () => {
    return `${entityType.toLowerCase()}_name_input`;
  };

  return (
    <div className="w-full mb-2 gap-1 items-center text-sm md:text-md lg:text-lg xl:text-xl ">
      <div className="flex items-center gap-2 w-full ">
        <label htmlFor={getId()} className="font-bold w-1/4 md:w-1/12">
          E-mail
        </label>

        <input
          type="text"
          id={getId()}
          name={type}
          className="italic text-xs md:text-sm lg:text-base xl:text-lg w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-secondaryTeal"
          required
          autoComplete={type}
          value={value}
          onChange={(e) => setFunction(e.target.value)}
        />
      </div>
    </div>
  );
}
