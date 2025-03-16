/**
 * @function PublicHeadBand
 *
 * A header section that includes a tagline and the platform's logo.
 * The section displays:
 * - A tagline: "Votre santé, nos soins experts" which means "Your health, our expert care".
 * - The platform's logo (imported from `/logos/Main-Logo.png`), adjusting its size based on the screen size.
 *
 * @returns {JSX.Element} - A header section with a tagline and logo, used across various public-facing pages.
 *
 * @example
 * <PublicHeadBand />
 */

import logo from '/logos/Main-Logo.png';

export default function PublicHeadBand() {
  return (
    <div className="flex flex-col justify-center items-center mb-6">
      <p className="text-center text-primaryBlue italic font-semibold mb-2 text-sm md:text-xl xl:text-2xl 2xl:text-3xl">
        "Votre santé, nos soins experts"
      </p>

      <img
        src={logo}
        alt="kinesoin"
        className="w-14 md:w-20 xl:w-24 2xl:w-28"
      />
    </div>
  );
}
