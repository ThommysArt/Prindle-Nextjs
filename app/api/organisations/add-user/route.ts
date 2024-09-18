import { NextResponse } from 'next/server'
import { prisma } from '@/prisma/prisma'
import { auth } from '@/auth'

export async function POST(request: Request) {
  const session = await auth()
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { email, role, orgId } = await request.json()

    // Check if the user making the request has permission to add users
    const requesterOrgUser = await prisma.organisationUser.findFirst({
      where: { 
        orgId,
        user: { email: session.user.email },
        role: { in: ['FOUNDER', 'MANAGER'] }
      }
    })

    if (!requesterOrgUser) {
      return NextResponse.json({ error: 'Unauthorized to add users' }, { status: 403 })
    }

    // Check if the user already exists
    let user = await prisma.user.findUnique({ where: { email } })

    if (!user) {
      // If the user doesn't exist, create a new user
      user = await prisma.user.create({
        data: { email, name: email.split('@')[0] }
      })
    }

    // Add the user to the organization
    const orgUser = await prisma.organisationUser.create({
      data: {
        orgId,
        userId: user.id,
        role,
      }
    })

    return NextResponse.json(orgUser)
  } catch (error) {
    console.error('Error adding user to organization:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}