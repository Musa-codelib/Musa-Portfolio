import { portfolio } from "../data/portfolio";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Highlights from "../components/Highlights";
import Skills from "../components/Skills";
import Work from "../components/Work";
import MkodesBlock from "../components/MkodesBlock";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

async function getProjects() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/projects`,
      { cache: "no-store" }
    );
    const data = await res.json();
    return data?.length ? data : null;
  } catch {
    return null;
  }
}

async function getSkills() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/skills`,
      { cache: "no-store" }
    );
    const data = await res.json();
    return data?.length ? data : null;
  } catch {
    return null;
  }
}

async function getBio() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/bio`,
      { cache: "no-store" }
    );
    const data = await res.json();
    return data?.bio ? data : null;
  } catch {
    return null;
  }
}

async function getHighlights() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/highlights`,
      { cache: "no-store" }
    );
    const data = await res.json();
    return data?.length ? data : null;
  } catch {
    return null;
  }
}

export default async function Page() {
  const [projects, skills, bio, highlights] = await Promise.all([
    getProjects(),
    getSkills(),
    getBio(),
    getHighlights(),
  ]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero heroStats={bio?.heroStats} />
        <Highlights highlights={highlights} />
        <Skills skills={skills || portfolio.skills.categories} />
        <Work projects={projects} videoArchiveLinks={bio?.videoArchiveLinks} />
        <MkodesBlock />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
