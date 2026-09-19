import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { ScreenShell } from "./screen-shell";

export type LetterScreenProps = {
  onBackHome: () => void;
};

export function LetterScreen({ onBackHome }: LetterScreenProps) {
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
              daddy&apos;s note
            </p>
            <h1 className="mt-2 text-3xl font-black text-[var(--color-navy)]">
              Happy 4th birthday, Zayn!
            </h1>
          </div>

          <div className="rounded-[var(--radius-xl)] border border-white/15 bg-white/10 p-5 text-base leading-8 text-[var(--color-navy)]/80 shadow-[var(--shadow-card)] backdrop-blur-sm">
            <p>Dear Zayn,</p>
            <p className="mt-3">
              You are our joy, our sunshine, and our biggest little adventure.
              Every smile, every giggle, and every brave step makes our hearts
              so full.
            </p>
            <p className="mt-3">
              We are so proud of you, and we love you more than words can say.
              Happy 4th birthday, little love. You are our special treasure.
            </p>
            <p className="mt-3 font-bold">Love, Daddy and family</p>
          </div>

          <Button variant="primary" onClick={onBackHome}>
            Kembali ke beranda
          </Button>
        </motion.div>
      }
    />
  );
}
