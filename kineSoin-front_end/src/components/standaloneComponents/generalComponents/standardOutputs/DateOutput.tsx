export default function DateOutput({ value }: { value: string | undefined }) {
  return (
    <div
      className={`flex-col items-start w-full mb-2 flex gap-1 text-xs md:text-sm lg:text-base xl:text-lg`}
    >
     
      <span className="italic font-normal">{value}</span>
    </div>
  );
}
