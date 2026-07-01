import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon } from 'lucide-react';

export default function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Disclosure>
      {({ open }) => (
        <div className="border rounded-xl mb-4 bg-white shadow">
          <Disclosure.Button className="flex w-full justify-between items-center px-4 py-2 text-left font-semibold text-primaryBlue bg-gray-100 hover:bg-gray-200 transition rounded-t-xl">
            <span>{title}</span>
            <ChevronDownIcon
              className={`w-5 h-5 transition-transform duration-200 ${
                open ? 'rotate-180' : ''
              }`}
            />
          </Disclosure.Button>
          <Disclosure.Panel className="p-4">{children}</Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  );
}
