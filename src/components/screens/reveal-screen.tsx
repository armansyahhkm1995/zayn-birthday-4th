import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { PhotoCard } from "../ui/photo-card";
import { ScreenShell } from "./screen-shell";

export type RevealScreenProps = {
  title: string;
  subtitle: string;
  body: string;
  ctaLabel: string;
  onNext: () => void;
};

export function RevealScreen({
  title,
  subtitle,
  body,
  ctaLabel,
  onNext,
}: RevealScreenProps) {
  return (
    <ScreenShell
      withCoralDecoration
      content={
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="space-y-4 pb-10"
        >
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--color-ocean-100)]/80">
              surprise time
            </p>
            <h1 className="mt-2 text-3xl font-black text-[var(--color-navy)]">
              {title}
            </h1>
          </div>

          <PhotoCard
            imageSrc="/assets/reveal/birthday-reveal.png"
            alt="Zayn birthday surprise"
            title={subtitle}
            caption={body}
            className="shadow-[var(--shadow-card)]"
          />

          <Button variant="primary" onClick={onNext}>
            {ctaLabel}
          </Button>
        </motion.div>
      }
    />
  );
}
