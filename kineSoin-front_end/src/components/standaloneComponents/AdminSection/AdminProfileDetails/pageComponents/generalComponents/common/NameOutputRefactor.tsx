interface NameOutputRefactorProps {
  name: string | undefined;
  surname: string | undefined;
}

export default function NameOutputRefactor({
  name,
  surname,
}: NameOutputRefactorProps) {
  return (
    <div className="mb-2 text-sm md:text-md lg:text-lg xl:text-xl ">
      <div className="flex gap-1 items-center">
        <h4 className="font-bold">Nom: </h4>
        <span className="italic font-normal">
          {name && surname ? `${name} ${surname}` : name}
        </span>
      </div>
    </div>
  );
}
