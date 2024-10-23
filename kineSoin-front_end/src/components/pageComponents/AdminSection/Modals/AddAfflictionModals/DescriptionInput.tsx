export default function DescriptionInput() {
  return (
    <div>
      <label
        htmlFor="affliction-description_input"
        className="block text-xs md:text-sm font-medium text-gray-700"
      >
        Description
      </label>
      <textarea
        id="affliction_description_input"
        name="description"
        className="border-2 border-gray-300 rounded-md px-2 font-normal italic w-full"
        rows={5}
      ></textarea>
    </div>
  );
}
