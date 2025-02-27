interface LicenceCodeOutputRefactorProps {
  licence_code: string | undefined;
}

export default function LicenceCodeOutputRefactor({
  licence_code,
}: LicenceCodeOutputRefactorProps) {
  if (!licence_code) {
    return null;
  }

  return (
    <div className="mb-2 flex gap-1 items-center text-sm md:text-md lg:text-lg xl:text-xl ">
      <h4 className="font-bold">Code ADELI: </h4>
      <span className="italic font-normal">{licence_code}</span>
    </div>
  );
}
