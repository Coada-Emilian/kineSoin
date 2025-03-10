import BaseOutput from './BaseOutput';

interface NameOutputRefactorProps {
  name: string | undefined;
  surname: string | undefined;
}

export default function NameOutputRefactor({
  name,
  surname,
}: NameOutputRefactorProps) {
  const fullName = name && surname ? `${name} ${surname}` : name;

  return <BaseOutput label="Nom" value={fullName} />;
}
