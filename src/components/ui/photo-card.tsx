import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

export type PhotoCardProps = {
  imageSrc: string;
  alt: string;
  title?: ReactNode;
  caption?: ReactNode;
  objectPosition?: string;
  className?: string;
};

export function PhotoCard({
  imageSrc,
  alt,
  title,
  caption,
  objectPosition = "center",
  className,
}: PhotoCardProps) {
  return (
    <figure
      className={cn(
        "overflow-hidden rounded-[var(--radius-xl)] bg-white/85 shadow-[var(--shadow-card)]",
        className,
      )}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={imageSrc}
          alt={alt}
          fill
          sizes="(max-width: 430px) 100vw, 430px"
          className="object-cover"
          style={{ objectPosition }}
        />
      </div>

      {(title || caption) && (
        <figcaption className="space-y-1 px-4 py-3">
          {title && (
            <h3 className="text-lg font-black text-[var(--color-navy)]">
              {title}
            </h3>
          )}
          {caption && (
            <p className="text-sm text-[var(--color-navy)]/75">{caption}</p>
          )}
        </figcaption>
      )}
    </figure>
  );
}
