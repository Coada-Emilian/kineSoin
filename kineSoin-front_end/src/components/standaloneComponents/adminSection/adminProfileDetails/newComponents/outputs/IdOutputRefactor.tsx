/**
 * @component IdOutputRefactor
 *
 * Displays the ID of an entity using the BaseOutput component.
 *
 * @param {Object} props
 * @param {number | null} props.id - The ID number of the entity; if null, no value is displayed.
 *
 * @returns {JSX.Element} A BaseOutput component showing the ID as a string or empty if no ID is provided.
 *
 * @example
 * <IdOutputRefactor id={123} />
 */

import BaseOutput from '../../../../generalComponents/BaseOutput';

interface IdOutputRefactorProps {
  id: number | null;
}

export default function IdOutputRefactor({ id }: IdOutputRefactorProps) {
  return <BaseOutput label="ID" value={id ? id.toString() : undefined} />;
}
