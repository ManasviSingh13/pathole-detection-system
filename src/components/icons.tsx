import type React from 'react';

export const PotholePatrolLogo = (
  props: React.SVGProps<SVGSVGElement>
) => (
  <svg
    {...props}
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
  >
    <path
      d="M 50,5 L 95,95 L 5,95 Z"
      stroke="hsl(var(--accent))"
      strokeWidth="10"
      fill="none"
      strokeLinejoin="round"
      strokeLinecap="round"
    />
    <text
      x="50"
      y="80"
      fontSize="50"
      textAnchor="middle"
      fill="hsl(var(--accent-foreground))"
      className="font-headline"
    >
      !
    </text>
  </svg>
);
