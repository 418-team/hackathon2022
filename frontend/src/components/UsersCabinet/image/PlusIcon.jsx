export function PlusIcon({
  size = 27,
  fill = "#00A5AA",
  plusFill = "white",
  variant = "primary",
  className,
}) {
  if (variant === "primary")
    return (
      <svg
        width={size}
        height={size}
        className={className}
        viewBox="0 0 27 27"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="13.5" cy="13.5" r="13.5" fill={fill} />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13.6588 7.94116C13.1325 7.94116 12.7059 8.36781 12.7059 8.8941V12.8945H8.70551C8.17921 12.8945 7.75256 13.3212 7.75256 13.8475C7.75256 14.3737 8.17921 14.8004 8.70551 14.8004H12.7059V18.8007C12.7059 19.327 13.1325 19.7537 13.6588 19.7537C14.1851 19.7537 14.6118 19.327 14.6118 18.8007V14.8004H18.6121C19.1384 14.8004 19.5651 14.3737 19.5651 13.8475C19.5651 13.3212 19.1384 12.8945 18.6121 12.8945H14.6118V8.8941C14.6118 8.36781 14.1851 7.94116 13.6588 7.94116Z"
          fill={plusFill}
        />
      </svg>
    );

  if (variant === "blurred")
    return (
      <svg
        width={size}
        height={size}
        className={className}
        viewBox="0 0 34 34"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="17" cy="17" r="17" fill="white" fillOpacity="0.19" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M17.2 10C16.5372 10 16 10.5373 16 11.2V16.2375H10.9625C10.2997 16.2375 9.76245 16.7748 9.76245 17.4375C9.76245 18.1002 10.2997 18.6375 10.9625 18.6375H16V23.675C16 24.3377 16.5372 24.875 17.2 24.875C17.8627 24.875 18.4 24.3377 18.4 23.675V18.6375H23.4375C24.1002 18.6375 24.6375 18.1002 24.6375 17.4375C24.6375 16.7748 24.1002 16.2375 23.4375 16.2375H18.4V11.2C18.4 10.5373 17.8627 10 17.2 10Z"
          fill="white"
        />
      </svg>
    );
}
