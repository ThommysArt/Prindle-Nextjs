"use server"

import { prisma } from '@/prisma/prisma'
import { OrgUserRole } from "@prisma/client"
import { auth } from '@/auth'

export const createOrganisation = async (name: string, userId: string) => {
    const org = await prisma.organisation.create({
        data: {
            name: name,
        },
    })
    await prisma.organisationUser.create({
        data: {
            userId: userId,
            orgId: org.orgId,
            role: OrgUserRole.FOUNDER,
        }
    })
    return org
}