import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { fetchBodyRegions } from '../../../../../../../utils/apiUtils';
import { useEffect, useState } from 'react';
import { IBodyRegion } from '../../../../../../../@types/IBodyRegion';
import { IAffliction } from '../../../../../../../@types/IAffliction';
import { Link } from 'react-router-dom';
import DNALoader from '../../../../../../../utils/DNALoader';

interface AfflictionInputProps {
  affliction: IAffliction;
  setChosenBodyRegionId?: React.Dispatch<
    React.SetStateAction<number | undefined>
  >;
  isRegionInput?: boolean;
  isInsuranceCodeInput?: boolean;
  isOperatedInput?: boolean;
  setAfflictionOperatedStatus?: React.Dispatch<React.SetStateAction<boolean>>;
  isDescriptionInput?: boolean;
  afflictionDescription?: string;
  setAfflictionDescription?: React.Dispatch<React.SetStateAction<string>>;
}
export default function AfflictionInput({
  affliction,
  setChosenBodyRegionId,
  isRegionInput,
  isInsuranceCodeInput,
  isOperatedInput,
  isDescriptionInput,
  setAfflictionOperatedStatus,
  afflictionDescription,
  setAfflictionDescription,
}: AfflictionInputProps) {
  const [regionName, setRegionName] = useState(affliction.body_region?.name);
  const [bodyRegions, setBodyRegions] = useState<IBodyRegion[]>([]);
  const [loading, setLoading] = useState(true);

  const [isOperated, setIsOperated] = useState<string>(
    affliction.is_operated ? 'Oui' : 'Non'
  );

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

  if (!bodyRegions) {
    return <div>No body regions found.</div>;
  }

  return (
    <>
      {isRegionInput ? (
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
                        setChosenBodyRegionId &&
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
      ) : isInsuranceCodeInput || isDescriptionInput ? (
        <div
          className={
            isDescriptionInput
              ? 'flex flex-col gap-2 justify-start mb-2'
              : 'flex gap-2 items-center mb-2 '
          }
        >
          <label
            htmlFor={
              isDescriptionInput
                ? 'affliction_description'
                : 'affliction-insurance_code'
            }
            className="font-semibold"
          >
            {isDescriptionInput ? 'Description :' : 'Cotation :'}
          </label>
          {isInsuranceCodeInput ? (
            <input
              type="text"
              name="insurance_code"
              id="affliction-insurance_code"
              className="border-2 border-gray-300 rounded-md px-2 italic"
              placeholder={affliction.insurance_code || ''}
            />
          ) : (
            <textarea
              name="description"
              id="affliction_description"
              className="border-2 border-gray-300 rounded-md px-2 font-normal italic "
              rows={7}
              placeholder={affliction.description}
              value={afflictionDescription}
              onChange={(e) =>
                setAfflictionDescription &&
                setAfflictionDescription(e.target.value)
              }
            ></textarea>
          )}
        </div>
      ) : isOperatedInput ? (
        <div className="md:text-2xl md:flex md:gap-1">
          <h4 className="font-bold ">Est opérée :</h4>
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <MenuButton
                className={`inline-flex w-full justify-center gap-x-1.5 rounded-lg bg-white p-2 px-3 py-2 my-0 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50`}
              >
                {isOperated}
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
                {isOperated === 'Oui' ? (
                  <MenuItem>
                    <Link
                      to="#"
                      className="block px-4 py-2 text-sm text-gray-700 bg-white font-medium data-[focus]:bg-gray-200 data-[focus]:text-gray-900"
                      onClick={() => {
                        {
                          setAfflictionOperatedStatus &&
                            setAfflictionOperatedStatus(false);
                          setIsOperated('Non');
                        }
                      }}
                    >
                      Non
                    </Link>
                  </MenuItem>
                ) : (
                  <MenuItem>
                    <Link
                      to="#"
                      className="block px-4 py-2 text-sm text-gray-700 bg-white font-medium data-[focus]:bg-gray-200 data-[focus]:text-gray-900"
                      onClick={() => {
                        {
                          setAfflictionOperatedStatus &&
                            setAfflictionOperatedStatus(true);
                          setIsOperated('Oui');
                        }
                      }}
                    >
                      Oui
                    </Link>
                  </MenuItem>
                )}
              </div>
            </MenuItems>
          </Menu>
        </div>
      ) : (
        ''
      )}
    </>
  );
}
