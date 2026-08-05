import Image from "next/image";

export function ProjectShot({
  title,
  src,
  className = "",
}: {
  title: string;
  src?: string;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-lg border border-border bg-surface ${className}`}
    >
      <div className="flex items-center gap-1.5 border-b border-border px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-border" />
        <span className="h-2 w-2 rounded-full bg-border" />
        <span className="h-2 w-2 rounded-full bg-border" />
      </div>
      <div className="relative aspect-[16/10] w-full">
        {src ? (
          <Image
            src={src}
            alt={`${title} screenshot`}
            fill
            className="object-cover object-top"
            sizes="(min-width: 1024px) 45vw, 100vw"
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_30%_20%,rgba(110,231,183,0.12),transparent_60%)]"
            aria-hidden="true"
          >
            <span className="text-sm font-medium tracking-wide text-muted">
              {title}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
