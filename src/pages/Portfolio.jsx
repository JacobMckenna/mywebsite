import { useMemo } from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import HeroSection from "../components/HeroSection";
import FocusTabs from "../components/FocusTabs";
import DotBackground from "../components/layout/DotBackground";

function Portfolio() {
  const tech = useMemo(
    () => ["React", "TypeScript", "Firebase", "Node", "PostgreSQL", "Python", "Git", "Unity", "GIS"],
    []
  );

  const tabs = useMemo(
    () => [
      {
        key: "build",
        label: "What I Build",
        items: [
          "I enjoy building full-stack web apps using React and Firebase, especially when they involve authentication, real-time data, or analytics.",
          "I put a lot of focus on making interfaces feel clean, responsive, and genuinely easy to use.",
          "I like working with data-heavy features, and I'm especially interested in adding geospatial or GIS components when they make sense.",
        ],
      },
      {
        key: "work",
        label: "How I Work",
        items: [
          "I like owning features from start to finish — planning them out, building them, polishing them, and getting them deployed.",
          "I care a lot about writing code that's easy to read and maintain, not just something that works once.",
          "I try to think about how people will actually use what I build, which means testing edge cases, performance, and real-world scenarios.",
        ],
      },
      {
        key: "explore",
        label: "What I'm Exploring",
        items: [
          "I've been diving deeper into applied geomatics and GIS workflows because I enjoy working with spatial data and systems-level thinking.",
          "I'm working on improving UX polish, especially things like accessibility, responsiveness, and small interaction details that make apps feel smoother.",
          "I'm interested in building tools that people would actually want to use, not just projects that sit in a portfolio.",
        ],
      },
    ],
    []
  );

  return (
    <DotBackground>
        <Header />

        <main className="w-full max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 py-12 sm:py-16 lg:py-24">
          <section className="flex flex-col gap-8 w-full min-w-0">
            <HeroSection tech={tech} />
            <FocusTabs tabs={tabs} />
          </section>
        </main>

        <Footer />
    </DotBackground>
  );
}

export default Portfolio;
