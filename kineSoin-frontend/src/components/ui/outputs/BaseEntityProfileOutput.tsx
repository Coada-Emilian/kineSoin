import type { BaseEntityProfileOutputProps } from '../../../@types/props/componentProps';

export default function BaseEntityProfileOutput({
  label,
  value,
  isTextArea,
  isOneThirdWidth,
  isAgeOutput,
}: BaseEntityProfileOutputProps) {
  if (!value) {
    return null;
  }

  return (
    <div
      className={`${isTextArea ? 'flex-col items-start' : 'flex-row items-center'} ${isOneThirdWidth ? 'w-1/3' : 'w-full'}  flex gap-1`}
    >
      <h4 className="font-bold">{label}</h4>

      {!isTextArea ? (
        <span className="font-normal">
          {value} {isAgeOutput ? 'ans' : ''}
        </span>
      ) : (
        <textarea
          className="w-full h-32 p-2 rounded-xl bg-slate-100 border border-slate-100 italic focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-secondaryTeal "
          value={value}
          readOnly
        ></textarea>
      )}
    </div>
  );
}
