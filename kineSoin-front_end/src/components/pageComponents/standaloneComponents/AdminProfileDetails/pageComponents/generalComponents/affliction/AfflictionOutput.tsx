/**
 * @file AfflictionOutput.tsx
 * @description A React functional component that displays the affliction's details as read-only outputs within a profile. This component conditionally renders specific fields, such as the affliction's body region, insurance code, operation status, and description, based on various output flags.
 *
 * @param {Object} props - The props for the AfflictionOutput component.
 * @param {IAffliction} props.affliction - The affliction details object containing information about the affliction.
 * @param {boolean} [props.isRegionOutput] - Optional flag indicating if the body region output should be displayed.
 * @param {boolean} [props.isInsuranceCodeOutput] - Optional flag indicating if the insurance code output should be displayed.
 * @param {boolean} [props.isOperatedOutput] - Optional flag indicating if the operation status output should be displayed.
 * @param {boolean} [props.isDescriptionOutput] - Optional flag indicating if the description output should be displayed.
 *
 * @returns {JSX.Element} The rendered AfflictionOutput component, conditionally displaying affliction details based on the specified flags.
 */

import { IAffliction } from '../../../../../../../@types/IAffliction';

interface AfflictionOutputProps {
  affliction: IAffliction;
  isRegionOutput?: boolean;
  isInsuranceCodeOutput?: boolean;
  isOperatedOutput?: boolean;
  isDescriptionOutput?: boolean;
}

export default function AfflictionOutput({
  affliction,
  isRegionOutput,
  isOperatedOutput,
  isDescriptionOutput,
  isInsuranceCodeOutput,
}: AfflictionOutputProps) {
  return (
    <>
      {isDescriptionOutput ? (
        <div className="md:text-2xl flex flex-col">
          <label
            htmlFor="affliction_description_container"
            className="font-bold"
          >
            Description :
          </label>

          <textarea
            readOnly
            id="affliction_description_container"
            className="border-2 border-gray-300 rounded-md px-2 font-normal italic "
            rows={7}
            value={affliction.description}
          ></textarea>
        </div>
      ) : (
        <div className="md:text-2xl md:flex md:gap-1">
          <h4 className="font-bold ">
            {isRegionOutput
              ? 'Région concernée :'
              : isInsuranceCodeOutput
                ? 'Cotation :'
                : isOperatedOutput
                  ? 'Est opérée :'
                  : ''}
          </h4>
          <span className="italic font-normal">
            {isRegionOutput
              ? affliction.body_region?.name
              : isInsuranceCodeOutput
                ? affliction.insurance_code
                : isOperatedOutput
                  ? affliction.is_operated
                    ? 'Oui'
                    : 'Non'
                  : ''}
          </span>
        </div>
      )}
    </>
  );
}
