import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { verifyToken, getTokenFromRequest } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export async function GET() {
  const client = await clientPromise
  const db = client.db('portfolio')
  const bio = await db.collection('bio').findOne({})
  return NextResponse.json(bio)
}

export async function PUT(request) {
  const token = getTokenFromRequest(request)
  if (!verifyToken(token)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await request.json()
  const client = await clientPromise
  const db = client.db('portfolio')
  await db.collection('bio').updateOne(
    {},
    { $set: { 
      socialLinks: body.socialLinks,
      heroStats: body.heroStats,
      videoArchiveLinks: body.videoArchiveLinks
    }},
    { upsert: true }
  )
  return NextResponse.json({ success: true })
}
