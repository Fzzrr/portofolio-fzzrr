import Experience from "@/components/Experience";
import Footer from "@/components/Footer";

export default function ExperiencePage() {
  return (
    <main className="relative min-h-screen text-neutral-50 selection:bg-neutral-500/30">
      {/* faint grid background */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]"
      />

      <div className="mx-auto max-w-5xl px-6">
        <Experience showMore={false} />
        <Footer />
      </div>
    </main>
  );
}
