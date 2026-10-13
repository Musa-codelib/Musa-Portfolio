import { NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import clientPromise from '@/lib/mongodb'
import { verifyToken, getTokenFromRequest } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export async function PUT(request, { params }) {
  const token = getTokenFromRequest(request)
  if (!verifyToken(token)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await request.json()
  const client = await clientPromise
  const db = client.db('portfolio')

  if (body.featured === true && body.section) {
    await db.collection('projects').updateMany(
      { section: body.section, _id: { $ne: new ObjectId(params.id) } },
      { $set: { featured: false } }
    )
  }

  await db.collection('projects').updateOne({ _id: new ObjectId(params.id) }, { $set: body })
  return NextResponse.json({ success: true })
}

export async function DELETE(request, { params }) {
  const token = getTokenFromRequest(request)
  if (!verifyToken(token)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const client = await clientPromise
  const db = client.db('portfolio')
  await db.collection('projects').deleteOne({ _id: new ObjectId(params.id) })
  return NextResponse.json({ success: true })
}
