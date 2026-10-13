import { portfolio } from "../data/portfolio";

export default function About({ bio }) {
  const about = bio || portfolio.about;

  return (
    <section
      className="w-full px-5 md:px-12 py-16 border-b border-surface-container-high bg-background"
      id="foundation"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        <div className="w-full flex items-baseline justify-between border-b border-surface-container-high pb-2">
          <span className="font-label-mono text-[12px] font-medium text-secondary uppercase tracking-[0.14em]">
            {portfolio.about.sectionLabel}
          </span>
          <span className="font-label-mono text-[12px] font-medium text-secondary">
            {portfolio.about.sectionSubtitle}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Narrative */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <p className="w-full font-display font-medium text-[24px] text-primary leading-snug">
              {about.bio}
            </p>
            <div className="mt-8 pt-6 border-t border-surface-container-high flex flex-wrap items-center gap-8 font-label-caps text-[11px] font-semibold uppercase tracking-[0.14em] text-secondary">
              {about.socialLinks.map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-primary transition-colors underline underline-offset-4"
                >
                  {link.platform}
                </a>
              ))}
            </div>
          </div>

          {/* Right: Stat Blocks */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4">
            {about.stats.map((stat) => (
              <div
                key={stat.id}
                className="bg-surface-container-lowest border border-surface-container-high p-6 flex flex-col justify-between"
                style={{
                  boxShadow:
                    "0 8px 16px -2px rgba(0, 0, 0, 0.08), 0 16px 32px -4px rgba(0, 0, 0, 0.12)",
                }}
              >
                <div className="font-label-mono text-[12px] font-medium text-secondary uppercase tracking-[0.04em]">
                  {stat.id}
                </div>
                <div className="font-display font-semibold text-[72px] text-primary tracking-tight my-1">
                  {stat.value}
                </div>
                <div className="font-label-caps text-[11px] font-semibold uppercase text-secondary">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
