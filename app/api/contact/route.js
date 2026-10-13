import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { verifyToken, getTokenFromRequest } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export async function GET(request) {
  const token = getTokenFromRequest(request)
  if (!verifyToken(token)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const client = await clientPromise
  const db = client.db('portfolio')
  const contacts = await db.collection('contacts').find({}).sort({ createdAt: -1 }).toArray()
  return NextResponse.json(contacts)
}

export async function POST(request) {
  const body = await request.json()
  const client = await clientPromise
  const db = client.db('portfolio')
  await db.collection('contacts').insertOne({
    ...body,
    createdAt: new Date()
  })
  return NextResponse.json({ success: true })
}
