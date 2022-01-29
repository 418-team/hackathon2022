import "./styles.css";

export function Checkbox({ label, value, disabled, onChange }) {
  const handleOnChange = (e) => {
    if (onChange) {
      onChange(e.target.checked);
    }
  };

  return (
    <label className="container">
      <p>{label}</p>
      <input
        tabIndex={100}
        type="checkbox"
        checked={!!value}
        disabled={disabled}
        onChange={handleOnChange}
      />
      <span className="checkmark" />
    </label>
  );
}
