import { ReactNode } from "react";

const SIZES = {
  narrow: "max-w-2xl",
  default: "max-w-5xl",
  wide: "max-w-6xl",
  full: "max-w-none",
} as const;

export function Container({
  children,
  className = "",
  size = "default",
}: {
  children: ReactNode;
  className?: string;
  size?: keyof typeof SIZES;
}) {
  return (
    <div className={`mx-auto w-full px-6 sm:px-8 ${SIZES[size]} ${className}`}>
      {children}
    </div>
  );
}
