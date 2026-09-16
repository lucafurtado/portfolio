export function VideoPlaceholder({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  return (
    /* TODO: substituir por demo real anonimizada */
    <div
      className={`relative flex aspect-[16/10] items-center justify-center overflow-hidden rounded-lg border border-dashed border-border bg-surface ${className}`}
    >
      <div className="flex flex-col items-center gap-3 text-center">
        <span
          aria-hidden="true"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-border text-lg text-foreground/60"
        >
          ▶
        </span>
        <p className="font-mono text-xs uppercase tracking-wide text-muted">{label}</p>
      </div>
    </div>
  );
}
