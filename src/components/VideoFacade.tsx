import { Play } from "lucide-react";
import { useState } from "react";

type VideoFacadeProps = {
  youtubeId: string;
  title: string;
  className?: string;
};

// Not every YouTube video has a maxresdefault thumbnail. Fall back through
// progressively smaller (but always-present) sizes if a request 404s.
const THUMBNAIL_FALLBACKS = ["maxresdefault", "sddefault", "hqdefault", "mqdefault"] as const;

/**
 * Shows a styled thumbnail with a custom play button. The real YouTube
 * iframe (with autoplay) is only mounted after the user clicks, so the
 * page never ships an obviously-branded YouTube frame by default.
 */
export function VideoFacade({ youtubeId, title, className = "" }: VideoFacadeProps) {
  const [playing, setPlaying] = useState(false);
  const [thumbIndex, setThumbIndex] = useState(0);

  const handleThumbnailError = () => {
    setThumbIndex((i) => Math.min(i + 1, THUMBNAIL_FALLBACKS.length - 1));
  };

  return (
    <div
      className={`group relative aspect-video w-full overflow-hidden rounded-2xl bg-surface ${className}`}
    >
      {playing ? (
        <iframe
          className="h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="absolute inset-0 h-full w-full cursor-pointer"
          aria-label={`Play video: ${title}`}
        >
          <img
            src={`https://i.ytimg.com/vi/${youtubeId}/${THUMBNAIL_FALLBACKS[thumbIndex]}.jpg`}
            onError={handleThumbnailError}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-background/10 to-transparent" />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-background/90 shadow-lg backdrop-blur transition-transform duration-300 ease-out group-hover:scale-110">
              <Play className="ml-1 h-6 w-6 fill-foreground text-foreground" />
            </span>
          </span>
          <span className="absolute bottom-4 left-4 right-4 text-left text-sm font-medium text-foreground/90 sm:text-base">
            {title}
          </span>
        </button>
      )}
    </div>
  );
}

