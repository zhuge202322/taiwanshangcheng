export default function PageHero({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <section className="gradient-blue text-white py-16 md:py-20 text-center">
      <h1 className="text-3xl md:text-5xl font-medium tracking-wide">{title}</h1>
      {subtitle && <p className="mt-4 opacity-90 text-sm md:text-base">{subtitle}</p>}
    </section>
  );
}
