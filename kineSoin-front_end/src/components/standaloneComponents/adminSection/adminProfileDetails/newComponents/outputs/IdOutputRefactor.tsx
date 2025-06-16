import BaseOutput from './BaseOutput';

interface IdOutputRefactorProps {
  id: number | null;
}

export default function IdOutputRefactor({ id }: IdOutputRefactorProps) {
  return <BaseOutput label="ID" value={id ? id.toString() : undefined} />;
}
