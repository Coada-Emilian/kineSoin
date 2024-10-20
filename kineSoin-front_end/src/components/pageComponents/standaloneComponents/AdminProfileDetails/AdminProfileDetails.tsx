import { ITherapist } from '../../../../@types/ITherapist';
import CustomButton from '../../../standaloneComponents/Button/CustomButton';

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

interface AdminProfileDetailsProps {
  therapist: ITherapist;
}

export default function AdminProfileDetails({
  therapist,
}: AdminProfileDetailsProps) {
  return (
    <>
      {therapist && (
        <div className="flex flex-col md:flex-row md:space-x-6">
          <div className="flex-1 p-4 rounded-md">
            <h1 className="font-bold mb-4 text-xl">Inspection</h1>
            <section>
              <h4 className="font-bold mb-2">
                Statut :{' '}
                <span className="italic">{therapist.status.toUpperCase()}</span>
              </h4>
              <h4 className="font-semibold mb-2">
                #ID : <span className="italic font-medium">{therapist.id}</span>
              </h4>
              <h4 className="font-semibold mb-2">
                Nom:{' '}
                <span className="italic font-medium">{therapist.fullName}</span>
              </h4>
            </section>
            <section className="mb-2">
              <div>
                <h4 className="font-bold">Diplôme</h4>
                <span className="italic font-medium">{therapist.diploma}</span>
              </div>
            </section>
            <section className="mb-2">
              <h4 className="font-bold">Experience</h4>
              <span className="italic font-medium">{therapist.experience}</span>
            </section>
            <section className="mb-2">
              <h4 className="font-bold">Spécialité</h4>
              <span className="italic font-medium">{therapist.specialty}</span>
            </section>
            <section className="mb-2">
              <div>
                <h4 className="font-bold">Description</h4>
                <p>{therapist.description}</p>
              </div>
            </section>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 p-4 rounded-md">
            <img
              src={therapist.picture_url}
              alt={therapist.fullName}
              className="w-full h-auto rounded-md mb-4 max-w-xs shadow-2xl"
            />
            <div className="buttons flex gap-2 items-center justify-between mb-8">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                    Changer le statut
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="-mr-1 h-5 w-5 text-gray-400"
                    />
                  </MenuButton>
                </div>

                <MenuItems
                  transition
                  className="absolute left-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <div className="py-1">
                    <MenuItem>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                      >
                        Active
                      </a>
                    </MenuItem>
                    <MenuItem>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                      >
                        Inactive
                      </a>
                    </MenuItem>
                  </div>
                </MenuItems>
              </Menu>
              <CustomButton btnText="Valider" btnType="submit" normalBtn />
              <CustomButton btnText="Annuler" btnType="button" cancelButton />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
