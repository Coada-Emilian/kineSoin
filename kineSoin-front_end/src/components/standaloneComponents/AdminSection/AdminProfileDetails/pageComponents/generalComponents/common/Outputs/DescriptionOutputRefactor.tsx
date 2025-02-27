import BaseOutput from './BaseOutput';

interface DescriptionOutputRefactorProps {
  description: string | undefined;
}

export default function DescriptionOutputRefactor({
  description,
}: DescriptionOutputRefactorProps) {
  return <BaseOutput value={description} label="Description" isTextArea />;
}
