/** YouTube / Loom embed. Renders nothing while `src` is empty (set `videoEmbedUrl` in projects.ts). */
export function VideoEmbed({ src, title }: { src?: string; title: string }) {
  if (!src) return null;
  return (
    <div className="relative aspect-video overflow-hidden rounded-lg border border-border bg-surface">
      <iframe
        src={src}
        title={title}
        loading="lazy"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
        allowFullScreen
        className="absolute inset-0 h-full w-full"
      />
    </div>
  );
}
