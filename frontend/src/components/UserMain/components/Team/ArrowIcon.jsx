export function ArrowIcon({ className, color = "#00A5AA", size = 34 }) {
  return (
    <svg
      width={size}
      height={size}
      className={className}
      viewBox="0 0 34 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="17" cy="17" r="17" fill={color} />
      <path
        d="M15 11L21 17L15 23"
        stroke="white"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
