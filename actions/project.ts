"use server"

import { prisma } from "@/prisma/prisma"

export const createProject = async (name: string, description: string, orgId: string) => {
    const project = await prisma.project.create({
        data: {
            name: name,
            description: description,
            orgId: orgId
        }
    })
    return project
}