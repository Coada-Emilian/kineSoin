import logo from '/logos/Main-Logo.png';

export default function HeadBand() {
  return (
    <div className="flex flex-col justify-center items-center mb-6">
      <p className="text-center text-primaryBlue font-semibold mb-2">
        "Votre santé, nos soins experts"
      </p>
      <img src={logo} alt="kinesoin" className="w-14" />
    </div>
  );
}
