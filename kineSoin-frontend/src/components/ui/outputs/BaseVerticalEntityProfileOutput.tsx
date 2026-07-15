import type { BaseEntityProfileOutputProps } from '../../../@types/props/componentProps';

export default function BaseVerticalEntityProfileOutput({
  label,
  value,
  isOneThirdWidth,
  isAgeOutput,
}: BaseEntityProfileOutputProps) {
  if (!value) {
    return null;
  }

  return (
    <div
      className={`flex gap-1 flex-col items-start ${isOneThirdWidth ? 'w-1/3' : 'w-full'}  `}
    >
      <h4 className="font-bold">{label}</h4>

      <span className="font-normal wrap-break-word">
        {value} {isAgeOutput ? 'ans' : ''}
      </span>
    </div>
  );
}
