interface EmailOutputRefactorProps {
  email: string | undefined;
}

export default function EmailOutputRefactor({
  email,
}: EmailOutputRefactorProps) {
  if (!email) {
    return null;
  }

  return (
    <div className="mb-2 flex gap-1 items-center text-sm md:text-md lg:text-lg xl:text-xl ">
      <h4 className="font-bold">E-mail: </h4>
      <span className="italic font-normal">{email}</span>
    </div>
  );
}
