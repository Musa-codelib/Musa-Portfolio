import { portfolio } from "../data/portfolio";

export default function Footer() {
  const { footer } = portfolio;

  return (
    <footer className="w-full bg-background border-t border-surface-variant">
      <div className="h-16 w-full px-5 md:px-12 flex flex-col md:flex-row items-center justify-between gap-1 md:gap-0 font-label-mono text-[12px] font-medium text-secondary">
        <div className="text-left">{footer.copyright}</div>
        <div className="text-center text-on-surface">{footer.location}</div>
        <div className="text-right">{footer.stack}</div>
      </div>
    </footer>
  );
}
