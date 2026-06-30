/**
 * @component BaseOutput
 *
 * Displays a labeled output value, either as inline text or as a read-only textarea.
 *
 * @param {Object} props
 * @param {string} props.label - The label to display before the value.
 * @param {string | number | undefined} props.value - The value to display; if undefined or empty, renders nothing.
 * @param {boolean} [props.isTextArea=false] - If true, displays the value inside a read-only textarea instead of a span.
 * @param {boolean} [props.isOneThirdWidth=false] - If true, the component width is restricted to one-third of the container; otherwise, full width.
 *
 * @returns {JSX.Element | null} A styled output block showing the label and value or null if value is falsy.
 *
 * @example
 * <BaseOutput label="Description" value="This is a test." isTextArea={true} />
 * <BaseOutput label="Name" value="John Doe" />
 */

interface BaseOutputProps {
  label: string;
  value: string | number | undefined;
  isTextArea?: boolean;
  isOneThirdWidth?: boolean;
}

export default function BaseOutput({
  label,
  value,
  isTextArea,
  isOneThirdWidth,
}: BaseOutputProps) {
  if (!value) {
    return null;
  }

  return (
    <div
      className={`${isTextArea ? 'flex-col items-start' : 'flex-row items-center'} ${isOneThirdWidth ? 'w-1/3' : 'w-full'} mb-2 flex gap-1 text-xs md:text-sm lg:text-base xl:text-lg`}
    >
      <h4 className="font-bold">{label}: </h4>

      {!isTextArea ? (
        <span className="italic font-normal">{value}</span>
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
