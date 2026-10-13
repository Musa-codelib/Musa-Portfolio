import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { verifyToken, getTokenFromRequest } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export async function GET() {
  const client = await clientPromise
  const db = client.db('portfolio')
  const skills = await db.collection('skills').find({}).toArray()
  return NextResponse.json(skills)
}

export async function POST(request) {
  const token = getTokenFromRequest(request)
  if (!verifyToken(token)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await request.json()
  const client = await clientPromise
  const db = client.db('portfolio')
  const result = await db.collection('skills').insertOne(body)
  return NextResponse.json(result)
}
