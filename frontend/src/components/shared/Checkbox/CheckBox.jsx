import "./styles.css";

export function Checkbox({
  label,
  value,
  disabled,
  className,
  onChange,
  labelClassName,
  round,
}) {
  const handleOnChange = (e) => {
    if (onChange) {
      onChange(e.target.checked);
    }
  };

  const inputCls = `${round && "round"} ${!!value && "checked"}`;

  let cls = "nh-checkbox-wrapper";
  if (className) {
    cls += ` ${className}`;
  }
  let labelCls = "nh-checkbox";
  if (labelClassName) {
    labelCls = `${labelCls} ${labelClassName}`;
  }

  return (
    <div className={cls} key={value}>
      <label className={labelCls}>
        <input
          className={inputCls}
          tabIndex={100}
          type="checkbox"
          checked={!!value}
          disabled={disabled}
          onChange={handleOnChange}
        />
        {label}
      </label>
    </div>
  );
}
