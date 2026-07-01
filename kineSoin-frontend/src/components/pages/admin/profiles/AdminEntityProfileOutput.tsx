import type { AdminEntityProfileOutputProps } from '../../../../@types/props/adminProps';

export default function AdminEntityProfileOutput({
  label,
  value,
  isTextArea,
  isOneThirdWidth,
}: AdminEntityProfileOutputProps) {
  if (!value) {
    return null;
  }

  return (
    <div
      className={`${isTextArea ? 'flex-col items-start' : 'flex-row items-center'} ${isOneThirdWidth ? 'w-1/3' : 'w-full'}  flex gap-1 text-xs md:text-sm lg:text-base xl:text-lg`}
    >
      <h4 className="font-bold">{label} : </h4>

      {!isTextArea ? (
        <span className="font-normal">{value}</span>
      ) : (
        <textarea
          className="w-full h-32 p-2 rounded-lg bg-gray-200 italic focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-secondaryTeal "
          value={value}
          readOnly
        ></textarea>
      )}
    </div>
  );
}
