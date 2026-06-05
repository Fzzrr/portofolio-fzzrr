import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import GitHubContributions from "@/components/GitHubContributions";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Portfolio() {
  return (
    <main className="relative min-h-screen text-neutral-50 selection:bg-neutral-500/30">
      <div className="mx-auto max-w-5xl px-6">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <GitHubContributions />
        <Experience />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
