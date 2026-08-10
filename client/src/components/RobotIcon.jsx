export default function RobotIcon({ size = 24, className = '', strokeWidth = 1.8 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="4" y="8" width="16" height="11" rx="3" />
      <path d="M12 8V4.5" />
      <circle cx="12" cy="3.5" r="1" />
      <path d="M8.5 13.5h.01" strokeWidth={strokeWidth + 1} />
      <path d="M15.5 13.5h.01" strokeWidth={strokeWidth + 1} />
      <path d="M8.5 17h7" />
      <path d="M1 12.5v3M23 12.5v3" strokeWidth={strokeWidth - 0.4} />
    </svg>
  )
}
