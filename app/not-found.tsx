import Link from "next/link";
import { Button } from "../src/components/ui/button";
import { ScreenShell } from "../src/components/screens/screen-shell";

export default function NotFoundPage() {
  return (
    <ScreenShell
      withCoralDecoration
      content={
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full rounded-[var(--radius-xl)] border border-white/15 bg-white/10 p-6 text-center backdrop-blur-sm">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--color-ocean-100)]/80">
              not found
            </p>
            <h2 className="mt-2 text-2xl font-black text-[var(--color-navy)]">
              This page is not part of the adventure.
            </h2>
            <div className="mt-5">
              <Link href="/">
                <Button variant="primary">Back to start</Button>
              </Link>
            </div>
          </div>
        </div>
      }
    />
  );
}
