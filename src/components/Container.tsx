import { ReactNode } from "react";

/** Content column: 1080px max, 24px side gutter on mobile. */
export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1128px] px-6 ${className}`}>
      {children}
    </div>
  );
}
