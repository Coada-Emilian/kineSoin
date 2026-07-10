import type { TherapistHeroProps } from '../../@types/props/componentProps';
import { capitalizeFirstLetter } from '../../utils/functions/capitalizeFirstLetter';
import { formatCurrentDate } from '../../utils/functions/formatCurrentDate';
import { getGreeting } from '../../utils/functions/therapist/getGreeting';

export default function TherapistHero({
  userProfile,
  message,
}: TherapistHeroProps) {
  const greeting = getGreeting();
  const currentDate = capitalizeFirstLetter(formatCurrentDate());
  return (
    <div className="flex flex-col-reverse items-center justify-between gap-6 border border-slate-100 bg-linear-to-r from-teal-50 to-white p-6 shadow-sm md:flex-row">
      <div className="space-y-2 text-center md:text-left">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-800">
          {greeting}, {userProfile?.surname} 👋
        </h1>
        <p className=" text-sm md:text-base text-slate-500">{currentDate}</p>
        <p className="mt-1 text-sm text-slate-600">{message}</p>
      </div>

      <img
        src={userProfile?.picture_url ?? undefined}
        alt="Photo de profil"
        className="h-20 w-20 rounded-full border-4 border-white object-cover shadow-md md:h-24 md:w-24"
      />
    </div>
  );
}
