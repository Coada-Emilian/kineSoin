export default function standard() {
  return (
    <div className={divClassName}>
      <label htmlFor={labelHtmlFor} className={className}>
        {labelName}
      </label>
      {!boolean ? (
        <input
          type="text"
          id={inputId}
          name={inputName}
          className="#"
          placeholder={inputPlaceholder}
          required={required}
          value={inputValue}
          onChange={inputOnChange}
        />
      ) : (
        <textarea
          name="description"
          id={textAreaId}
          placeholder={textAreaPlaceholder}
          value={textAreaValue}
          onChange={textAreaOnChange}
          cols="30"
          rows="10"
        ></textarea>
      )}
    </div>
  );
}
