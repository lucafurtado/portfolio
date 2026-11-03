import Image from "next/image";

export function ProjectShot({
  title,
  src,
  alt,
  className = "",
  aspectClassName = "aspect-[16/10]",
  sizes = "(min-width: 1080px) 1032px, 100vw",
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
      className={`relative overflow-hidden rounded-lg border border-border bg-surface ${aspectClassName} ${className}`}
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
        <div className="flex h-full w-full items-center justify-center" aria-hidden="true">
          <span className="font-mono text-[13px] text-muted">{title}</span>
        </div>
      )}
    </div>
  );
}
