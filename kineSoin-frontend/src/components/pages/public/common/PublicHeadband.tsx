export default function PublicHeadband() {
  return (
    <div className="flex flex-col justify-center items-center mb-6 ">
      <p className="text-center text-primaryBlue italic font-semibold mb-2 text-sm md:text-xl xl:text-2xl 2xl:text-3xl">
        "Votre santé, nos soins experts"
      </p>

      <img
        src="/logos/newLogo_64.webp"
        srcSet="/logos/newLogo_64.webp 64w, /logos/newLogo_128.webp 128w"
        sizes="80px"
        alt="kinesoin"
        className="w-14 md:w-20 xl:w-24 2xl:w-28"
      />
    </div>
  );
}
