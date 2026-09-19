import { MobileAppShell } from "../components/mobile-shell";

export default function Home() {
  return (
    <MobileAppShell>
      <section className="flex flex-1 flex-col justify-between rounded-[var(--radius-xl)] border border-white/20 bg-[var(--color-surface)] p-5 shadow-[var(--shadow-card)] backdrop-blur-sm">
        <div className="space-y-4">
          <div className="inline-flex items-center rounded-full border border-[color:var(--color-yellow)]/60 bg-[color:var(--color-yellow)]/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--color-navy)]">
            Birthday quest
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl font-black leading-tight text-[var(--color-navy)]">
              Ready to dive into the puzzle adventure?
            </h2>
            <p className="text-base leading-7 text-[var(--color-navy)]/80">
              Follow the whale family, unlock story memories, and complete the
              final photo puzzle to find the birthday surprise.
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3">
          <button
            type="button"
            className="flex h-14 items-center justify-center rounded-full bg-[var(--color-yellow)] px-5 text-base font-black text-[var(--color-navy)] shadow-[var(--shadow-soft)] transition-transform duration-150 active:scale-[0.98]"
          >
            Start the adventure
          </button>
          <button
            type="button"
            className="flex h-12 items-center justify-center rounded-full border border-white/40 bg-white/10 px-5 text-base font-bold text-[var(--color-navy)] backdrop-blur-sm"
          >
            Resume progress
          </button>
        </div>
      </section>
    </MobileAppShell>
  );
}
