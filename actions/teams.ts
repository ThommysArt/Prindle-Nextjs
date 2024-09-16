"use server"

import { prisma } from "@/prisma/prisma"

export const createTeam = async (name: string, description: string, orgId: string) => {
    const team = await prisma.team.create({
        data: {
            name: name, 
            description: description,
            orgId: orgId
        }
    })
    return team
}
