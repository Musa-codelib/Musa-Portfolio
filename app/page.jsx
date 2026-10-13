import { portfolio } from "../data/portfolio";
import clientPromise from "../lib/mongodb";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Highlights from "../components/Highlights";
import Skills from "../components/Skills";
import Work from "../components/Work";
import MkodesBlock from "../components/MkodesBlock";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

export const dynamic = "force-dynamic";

async function getDb() {
  const client = await clientPromise;
  return client.db("portfolio");
}

async function getProjects() {
  try {
    const db = await getDb();
    const data = await db.collection("projects").find({}).sort({ createdAt: -1 }).toArray();
    return data.length ? JSON.parse(JSON.stringify(data)) : null;
  } catch {
    return null;
  }
}

async function getSkills() {
  try {
    const db = await getDb();
    const data = await db.collection("skills").find({}).sort({ order: 1 }).toArray();
    return data.length ? JSON.parse(JSON.stringify(data)) : null;
  } catch {
    return null;
  }
}

async function getBio() {
  try {
    const db = await getDb();
    const data = await db.collection("bio").findOne({});
    return data?.bio ? JSON.parse(JSON.stringify(data)) : null;
  } catch {
    return null;
  }
}

async function getHighlights() {
  try {
    const db = await getDb();
    const data = await db.collection("highlights").find({ active: true }).sort({ createdAt: -1 }).toArray();
    return data.length ? JSON.parse(JSON.stringify(data)) : null;
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
