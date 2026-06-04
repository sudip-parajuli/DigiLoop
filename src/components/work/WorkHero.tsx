export default function WorkHero() {
  return (
    <section className="section-lg bg-[var(--color-accent)] relative overflow-hidden flex items-center min-h-[50vh]">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full border border-white" />
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full border border-white" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-white" />
      </div>
      <div className="container relative z-10">
        <span className="section-label" style={{ color: "rgba(255,255,255,0.4)" }}>Portfolio</span>
        <h1 className="text-white max-w-2xl mb-4" data-reveal="up">
          Work that speaks{" "}
          <span style={{ color: "var(--color-accent2)" }}>louder</span>{" "}
          than words
        </h1>
        <p className="text-white/50 text-lg max-w-md" data-reveal="up" data-delay="0.1">
          A curated selection of projects we're proud of — each one a story of problem-solving and craft.
        </p>
      </div>
    </section>
  );
}
