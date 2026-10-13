import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { verifyToken, getTokenFromRequest } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export async function GET(request) {
  const client = await clientPromise
  const db = client.db('portfolio')

  const { searchParams } = new URL(request.url)
  const isAdmin = searchParams.get('admin') === 'true'

  if (isAdmin) {
    const token = getTokenFromRequest(request)
    if (!verifyToken(token)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const videos = await db.collection('videos')
      .find({})
      .sort({ createdAt: -1 })
      .toArray()
    return NextResponse.json(videos)
  }

  const videos = await db.collection('videos')
    .find({ active: true })
    .sort({ createdAt: -1 })
    .toArray()
  return NextResponse.json(videos)
}

export async function POST(request) {
  const token = getTokenFromRequest(request)
  if (!verifyToken(token)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await request.json()
  const client = await clientPromise
  const db = client.db('portfolio')
  const result = await db.collection('videos').insertOne({
    ...body,
    active: body.active ?? true,
    createdAt: new Date()
  })
  return NextResponse.json({ success: true, insertedId: result.insertedId })
}
