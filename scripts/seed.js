import { MongoClient } from 'mongodb'
import { portfolio } from '../data/portfolio.js'

const client = new MongoClient(process.env.MONGODB_URI)

async function seed() {
  await client.connect()
  const db = client.db('portfolio')

  // Clear existing
  await db.collection('projects').deleteMany({})
  await db.collection('skills').deleteMany({})
  await db.collection('bio').deleteMany({})

  // Seed projects — flatten from portfolio.js structure
  const aiTools = [
    { section: 'ai-tools', featured: true, ...portfolio.work.projects['ai-tools'].featured },
    ...portfolio.work.projects['ai-tools'].secondary.map(p => ({ section: 'ai-tools', featured: false, ...p }))
  ]
  const videoProjects = portfolio.work.projects.video.projects.map(p => ({ section: 'video', ...p }))
  const webProjects = portfolio.work.projects.web.projects.map(p => ({ section: 'web', ...p }))
  await db.collection('projects').insertMany([...aiTools, ...videoProjects, ...webProjects])

  // Seed skills
  await db.collection('skills').insertMany(portfolio.skills.categories)

  // Seed bio
  await db.collection('bio').insertOne({
    bio: portfolio.about.bio,
    socialLinks: portfolio.about.socialLinks,
    stats: portfolio.about.stats,
    heroStats: portfolio.hero.stats,
    videoArchiveLinks: portfolio.work.projects.video.archiveLinks
  })

  console.log('Seeded.')
  await client.close()
}

seed().catch(console.error)
