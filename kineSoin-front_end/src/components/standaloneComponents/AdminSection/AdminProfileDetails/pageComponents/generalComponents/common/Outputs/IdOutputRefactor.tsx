interface IdOutputRefactorProps {
  id: number | null;
}

export default function IdOutputRefactor({ id }: IdOutputRefactorProps) {
  return (
    <div className="mb-2 text-sm md:text-md lg:text-lg xl:text-xl ">
      <div className="flex gap-1 items-center">
        <h4 className="font-bold">ID: </h4>
        <span className="italic font-normal">{id}</span>
      </div>
    </div>
  );
}
