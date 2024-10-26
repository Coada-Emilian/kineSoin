/**
 * @file RegionInput.tsx
 * @description A React component that allows users to select a body region
 * from a dropdown menu. It fetches the body regions from an API and updates
 * the chosen region's ID in the parent component's state.
 *
 * @param {Object} props - The component props.
 * @param {React.Dispatch<number | undefined>} props.setChosenBodyRegionId -
 * A function to update the state of the chosen body region ID in the parent component.
 *
 * @returns {JSX.Element} The rendered RegionInput component, which includes
 * a dropdown menu for selecting a body region.
 */

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchBodyRegions } from '../../../../../utils/apiUtils';
import { IBodyRegion } from '../../../../../@types/IBodyRegion';
import DNALoader from '../../../../../utils/DNALoader';

interface RegionInputProps {
  setChosenBodyRegionId: React.Dispatch<number | undefined>;
}

export default function RegionInput({
  setChosenBodyRegionId,
}: RegionInputProps) {
  const [regionName, setRegionName] = useState('Choisir une région');
  const [bodyRegions, setBodyRegions] = useState<IBodyRegion[]>([]);

  // State to store the loading status
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
    return DNALoader();
  }

  return (
    <div className="md:text-2xl md:flex md:items-center md:gap-1">
      <h4 className="block text-xs md:text-sm font-medium text-gray-700">
        Region concernée
      </h4>
      <Menu as="div" className="relative inline-block text-left mt-1">
        <div>
          <MenuButton
            className={`inline-flex w-full justify-center gap-x-1.5 rounded-lg bg-white p-2 px-3 py-2 my-0 text-xs font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50`}
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
                  className="block px-4 py-2 text-xs text-gray-700 bg-white font-medium data-[focus]:bg-green-500 data-[focus]:text-gray-900"
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
  );
}
