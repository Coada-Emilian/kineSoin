import { TriangleAlert } from 'lucide-react';
import type { TherapistModalProps } from '../../../../@types/props/therapistProps';
import BaseModal from '../BaseModal';
import mainLogo from '/logos/newLogo_64.webp';

export default function TherapistModal({
  isOpen,
  onClose,
  header,
  message,
  patient,
  children,
  isDestructive,
  size,
}: TherapistModalProps) {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose} size={size} variant="tight">
      <div className="relative">
        <div
          className={`${size === 'sm' ? 'pb-14' : 'pb-20'} bg-linear-to-r from-teal-300 to-slate-200 rounded-t-xl p-6 text-center text-slate-800 uppercase font-semibold drop-shadow-sm tracking-wide`}
        >
          <p className="text-base md:text-xl bg-linear-to-r from-slate-800 to-slate-500 bg-clip-text text-transparent">
            {header}
          </p>
        </div>

        <div className="flex justify-center mt-2">
          <img
            src={patient?.picture_url || mainLogo}
            alt={patient?.name || 'profile'}
            className={`${size === 'sm' ? 'h-24 w-24' : 'h-36 w-36'} rounded-full border-4 border-slate-100 object-cover absolute top-15`}
          />
        </div>

        <div>
          <h2 className="mb-6 text-center italic text-slate-600 pt-16">
            {message}
          </h2>

          {isDestructive && (
            <div className="flex items-center md:gap-2 w-full justify-center font-semibold">
              <TriangleAlert color="#d20f0f" />
              <p className=" text-center text-xs md:text-sm  text-red-600 px-2">
                Cette action est définitive et ne peut pas être annulée.
              </p>
            </div>
          )}

          {children}
        </div>
      </div>
    </BaseModal>
  );
}
