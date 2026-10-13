import { portfolio } from "../data/portfolio";

export default function Skills({ skills }) {
  const categories = skills || portfolio.skills.categories;
  const sectionLabel = portfolio.skills.sectionLabel;
  const sectionSubtitle = portfolio.skills.sectionSubtitle;

  return (
    <section
      className="w-full px-5 md:px-12 py-16 border-b border-surface-container-high bg-background"
      id="capabilities"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        <div className="w-full flex items-baseline justify-between border-b border-surface-container-high pb-2">
          <span className="font-label-mono text-[12px] font-medium text-secondary uppercase tracking-[0.14em]">
            {sectionLabel}
          </span>
          <span className="font-label-mono text-[12px] font-medium text-secondary">
            {sectionSubtitle}
          </span>
        </div>

        <div className="flex flex-col border-b border-surface-container-high">
          {categories.map((category) => (
            <div
              key={category.title}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 py-8 border-t border-surface-container-high"
            >
              <div className="lg:col-span-4">
                <h3 className="font-display font-medium text-[24px] text-primary tracking-tight">
                  {category.title}
                </h3>
                <p className="font-label-mono text-[12px] font-medium text-secondary mt-1">
                  {category.subtitle}
                </p>
              </div>
              <div className="lg:col-span-8 flex flex-wrap gap-1 items-start">
                {category.items.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-1 h-fit bg-surface-container-lowest border border-surface-container-high text-primary font-label-mono text-[12px] font-medium transition-transform duration-150 hover:-translate-y-1 hover:shadow-md cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
