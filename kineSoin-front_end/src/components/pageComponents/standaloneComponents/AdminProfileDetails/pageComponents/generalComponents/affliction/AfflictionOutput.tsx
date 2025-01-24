// Purpose: Provide the AfflictionOutput component which displays the affliction details.

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
