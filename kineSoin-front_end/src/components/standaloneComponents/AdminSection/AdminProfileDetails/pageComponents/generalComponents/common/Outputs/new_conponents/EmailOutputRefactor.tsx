import BaseOutput from './BaseOutput';

interface EmailOutputRefactorProps {
  email: string | undefined;
}

export default function EmailOutputRefactor({
  email,
}: EmailOutputRefactorProps) {
  return <BaseOutput label="Email" value={email} />;
}
