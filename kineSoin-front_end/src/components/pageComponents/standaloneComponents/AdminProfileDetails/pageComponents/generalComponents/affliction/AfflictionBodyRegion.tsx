import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { IAffliction } from '../../../../../../../@types/IAffliction';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { IBodyRegion } from '../../../../../../../@types/IBodyRegion';
import { fetchBodyRegions } from '../../../../../../../utils/apiUtils';

interface AfflictionBodyRegionProps {
  affliction: IAffliction;
  isProfileEditing: boolean;
  setChosenBodyRegionId: React.Dispatch<
    React.SetStateAction<number | undefined>
  >;
}

export default function AfflictionBodyRegion({
  affliction,
  isProfileEditing,
  setChosenBodyRegionId,
}: AfflictionBodyRegionProps) {
  const [regionName, setRegionName] = useState(affliction.body_region?.name);
  const [bodyRegions, setBodyRegions] = useState<IBodyRegion[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBodyRegions()
      .then((bodyRegions) => {
        setBodyRegions(bodyRegions);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!bodyRegions) {
    return <div>No body regions found.</div>;
  }

  return (
    <section className="mb-2 md:text-2xl">
      {isProfileEditing ? (
        <div className="md:text-2xl md:flex md:gap-1">
          <h4 className="font-bold ">Region concernée :</h4>
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <MenuButton
                className={`inline-flex w-full justify-center gap-x-1.5 rounded-lg bg-white p-2 px-3 py-2 my-0 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50`}
              >
                {regionName}
                <ChevronDownIcon
                  aria-hidden="true"
                  className="-mr-1 h-5 w-5 text-gray-400"
                />
              </MenuButton>
            </div>

            <MenuItems
              transition
              className="absolute left-0 z-10 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-gray-200 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
            >
              <div className="py-1">
                {bodyRegions.map((region) => (
                  <MenuItem key={region.id}>
                    <Link
                      to="#"
                      className="block px-4 py-2 text-sm text-gray-700 bg-white font-medium data-[focus]:bg-green-500 data-[focus]:text-gray-900"
                      onClick={() => {
                        setRegionName(region.name);
                        setChosenBodyRegionId(region.id);
                      }}
                    >
                      {region.name}
                    </Link>
                  </MenuItem>
                ))}
              </div>
            </MenuItems>
          </Menu>
        </div>
      ) : (
        <div className="md:text-2xl md:flex md:gap-1">
          <h4 className="font-bold ">Region concernée :</h4>
          <span className="italic font-normal">
            {affliction.body_region?.name}
          </span>
        </div>
      )}
    </section>
  );
}
