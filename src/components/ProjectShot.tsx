import Image from "next/image";

export function ProjectShot({
  title,
  src,
  alt,
  className = "",
  aspectClassName = "aspect-[16/10]",
  sizes = "(min-width: 1024px) 45vw, 100vw",
}: {
  title: string;
  src?: string;
  alt?: string;
  className?: string;
  aspectClassName?: string;
  sizes?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-lg bg-surface ${aspectClassName} ${className}`}
    >
      {src ? (
        <Image
          src={src}
          alt={alt || `${title} screenshot`}
          fill
          className="object-cover object-top"
          sizes={sizes}
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
  );
}
