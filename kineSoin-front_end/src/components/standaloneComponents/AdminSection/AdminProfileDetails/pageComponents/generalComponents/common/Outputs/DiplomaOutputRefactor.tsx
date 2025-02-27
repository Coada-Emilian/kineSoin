interface DiplomaOutputRefactorProps {
  diploma: string | undefined;
}

export default function DiplomaOutputRefactor({
  diploma,
}: DiplomaOutputRefactorProps) {
  if (!diploma) {
    return null;
  }

  return (
    <div className="mb-2 flex gap-1 items-center text-sm md:text-md lg:text-lg xl:text-xl ">
      <h4 className="font-bold">Diplôme: </h4>
      <span className="italic font-normal">{diploma}</span>
    </div>
  );
}
