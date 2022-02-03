import { useState } from "react";

function Circle({ className, size = 37 }) {
  const [hover, setHover] = useState(false);

  const onHover = () => setHover((prev) => !prev);

  return (
    <svg
      width={size}
      height={size}
      onMouseEnter={onHover}
      onMouseLeave={onHover}
      className={className}
      viewBox="0 0 37 37"
      fill="none"
      style={{verticalAlign: 'baseline'}}
      xmlns="http://www.w3.org/2000/svg"
    >
      {hover ? (
        <circle cx="18.5" cy="18.5" r="18.5" fill="white" />
      ) : (
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M18.5 35.52C27.8999 35.52 35.52 27.8999 35.52 18.5C35.52 9.10011 27.8999 1.48 18.5 1.48C9.10011 1.48 1.48 9.10011 1.48 18.5C1.48 27.8999 9.10011 35.52 18.5 35.52ZM18.5 37C28.7173 37 37 28.7173 37 18.5C37 8.28273 28.7173 0 18.5 0C8.28273 0 0 8.28273 0 18.5C0 28.7173 8.28273 37 18.5 37Z"
          fill="white"
        />
      )}
      <circle cx="23.5" cy="24.5" r="4.5" fill={hover ? "#24272A" : "white"} />
    </svg>
  );
}

export default Circle;
