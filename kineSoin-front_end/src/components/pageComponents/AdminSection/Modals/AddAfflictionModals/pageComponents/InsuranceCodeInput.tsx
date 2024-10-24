export default function InsuranceCodeInput() {
  return (
    <div>
      <label
        htmlFor="affliction-insurance-code_input"
        className="block text-xs md:text-sm font-medium text-gray-700"
      >
        Cotation
      </label>
      <input
        type="text"
        id="affliction-insurance-code_input"
        name="insurance_code"
        className="mt-1 block text-xs md:text-sm w-full p-1 md:p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xs"
        required
      />
    </div>
  );
}
