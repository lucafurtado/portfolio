import type { ComponentProps, ReactNode } from "react";
import { Link } from "@/i18n/navigation";

/* ---------- Section label: "01 — Projetos" ---------- */

export function SectionLabel({ index, children }: { index?: number; children: ReactNode }) {
  return (
    <p className="section-label">
      {index !== undefined && <>{String(index).padStart(2, "0")} — </>}
      {children}
    </p>
  );
}

export function SectionTitle({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <h2 className={`mt-4 text-section font-semibold text-foreground ${className}`}>{children}</h2>
  );
}

/* ---------- Buttons ---------- */

type Variant = "primary" | "secondary";
type Size = "md" | "sm";

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-lg font-medium whitespace-nowrap transition-colors duration-150";
const SIZES: Record<Size, string> = {
  md: "h-11 px-5 text-[15px]",
  sm: "h-8 px-3 text-[13px]",
};
const VARIANTS: Record<Variant, string> = {
  primary: "bg-foreground text-background hover:opacity-85",
  secondary: "border border-border text-foreground hover:border-border-strong",
};

export function buttonClass(variant: Variant = "primary", size: Size = "md") {
  return `${BASE} ${SIZES[size]} ${VARIANTS[variant]}`;
}

/** External link or file (CV, mailto, LinkedIn). */
export function ButtonA({
  variant = "primary",
  size = "md",
  className = "",
  external,
  ...props
}: ComponentProps<"a"> & { variant?: Variant; size?: Size; external?: boolean }) {
  return (
    <a
      {...props}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`${buttonClass(variant, size)} ${className}`}
    />
  );
}

/** Internal (locale-aware) link styled as a button. */
export function ButtonLink({
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant; size?: Size }) {
  return <Link {...props} className={`${buttonClass(variant, size)} ${className}`} />;
}

/* ---------- Chip ---------- */

export function Chip({ children }: { children: ReactNode }) {
  return (
    <li className="rounded-md border border-border px-2 py-1 font-mono text-[13px] leading-none text-foreground">
      {children}
    </li>
  );
}

export function ChipList({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-2 ${className}`}>
      {items.map((item) => (
        <Chip key={item}>{item}</Chip>
      ))}
    </ul>
  );
}

/* ---------- Card ---------- */

export const cardClass =
  "card rounded-xl border border-border bg-surface transition-[border-color,transform] duration-200 ease-out hover:-translate-y-0.5 hover:border-border-strong";

/* ---------- Status dot ---------- */

export function StatusDot() {
  return <span aria-hidden="true" className="inline-block h-2 w-2 shrink-0 rounded-full bg-accent" />;
}

/* ---------- TODO marker (visible on purpose, so missing content is obvious) ---------- */

export function Todo({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-md border border-dashed border-border-strong px-2 py-1 font-mono text-[13px] text-muted">
      TODO: {children}
    </span>
  );
}
