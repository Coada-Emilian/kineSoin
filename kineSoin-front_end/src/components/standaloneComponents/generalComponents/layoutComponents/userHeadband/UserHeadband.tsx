import { Link } from 'react-router-dom';
import { IUserProfile } from '../../../../../@types/interfaces/customInterfaces';

interface UserHeadbandProps {
  userProfile?: IUserProfile;
  profileUrl: string;
  dashboardUrl: string;
}

export default function UserHeadband({
  userProfile,
  profileUrl,
  dashboardUrl,
}: UserHeadbandProps) {
  return (
    <div className="flex justify-around md:justify-start md:gap-5 md:px-10 bg-gray-200 p-5 items-center ">
      <Link to={profileUrl}>
        <img
          src={userProfile?.picture_url || ''}
          alt={userProfile?.fullName || ''}
          className="w-16 h-16 md:w-24 md:h-24 xl:w-30 xl:h-30 rounded-full object-cover shadow-2xl"
        />
      </Link>

      <div className="flex flex-col gap-1 items-center">
        <p className="text-primaryBlue text-sm font-semibold md:text-sm xl:text-base italic">
          Bienvenue {userProfile?.fullName} !
        </p>

        <Link to={dashboardUrl}>
          <p className="text-primaryBlue text-xs font-semibold md:text-sm xl:text-base italic block md:hidden">
            Revenir au tableau de bord
          </p>
        </Link>
      </div>
    </div>
  );
}
