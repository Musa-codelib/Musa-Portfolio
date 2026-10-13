import { NextResponse } from 'next/server'
import { signToken } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export async function POST(request) {
  console.log("ADMIN_USERNAME from env:", process.env.ADMIN_USERNAME)
  const { username, password } = await request.json()
  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const token = signToken({ username })
    return NextResponse.json({ token })
  }
  return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
}
