/** Simple left-to-right flow (stacks vertically on narrow screens). Pure HTML/CSS. */
export function FlowDiagram({
  steps,
  label,
  compact = false,
}: {
  steps: string[];
  label: string;
  compact?: boolean;
}) {
  return (
    <ol
      aria-label={label}
      className={`flex flex-col items-stretch ${compact ? "md:flex-row md:flex-wrap" : "lg:flex-row"} gap-2`}
    >
      {steps.map((step, i) => (
        <li
          key={step}
          className={`flex flex-col items-stretch gap-2 ${compact ? "md:flex-row md:items-center" : "lg:flex-1 lg:flex-row lg:items-center"}`}
        >
          <span
            className={`flex items-center rounded-lg border border-border bg-background font-mono text-[13px] leading-snug text-foreground ${
              compact ? "px-3 py-2" : "min-h-16 flex-1 px-3 py-3"
            }`}
          >
            <span className="mr-2 text-muted">{String(i + 1).padStart(2, "0")}</span>
            {step}
          </span>
          {i < steps.length - 1 && (
            <span aria-hidden="true" className="self-center font-mono text-[13px] text-muted">
              <span className={compact ? "md:hidden" : "lg:hidden"}>↓</span>
              <span className={compact ? "hidden md:inline" : "hidden lg:inline"}>→</span>
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}
