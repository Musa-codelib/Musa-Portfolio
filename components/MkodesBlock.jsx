import { portfolio } from "../data/portfolio";

export default function MkodesBlock() {
  const { mkodes } = portfolio;

  return (
    <section
      className="w-full px-5 md:px-12 py-16 border-b border-surface-container-high bg-background"
      id="studio"
    >
      <div className="max-w-7xl mx-auto">
        <div
          className="p-8 md:p-16 bg-surface-container-high border border-surface-dim"
          style={{
            boxShadow:
              "0 16px 30px -4px rgba(0,0,0,0.14), 0 6px 12px -2px rgba(0,0,0,0.08)",
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <span className="font-label-mono text-[12px] font-medium text-secondary uppercase tracking-[0.14em]">
                {mkodes.sectionLabel}
              </span>
              <h2 className="font-display font-semibold text-[72px] text-primary tracking-tighter uppercase leading-none mt-1">
                {mkodes.title}
              </h2>
            </div>
            <div className="lg:col-span-7 flex flex-col items-start gap-8">
              <p className="font-display font-medium text-[24px] text-primary tracking-tight leading-relaxed">
                {mkodes.description}
              </p>
              <a
                href={mkodes.cta.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center h-12 px-8 bg-transparent text-primary font-label-caps text-[11px] font-semibold uppercase tracking-[0.14em] hover:bg-primary hover:text-on-primary border border-primary transition-colors"
              >
                {mkodes.cta.text}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
