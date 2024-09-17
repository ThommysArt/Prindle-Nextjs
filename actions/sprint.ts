"use server"

import { prisma } from "@/prisma/prisma"

export const createSprint = async (title: string, description: string, startDate: Date, endDate: Date, projectId: string, status: string, teamId: string) => {
    const sprint = await prisma.sprint.create({
        data: {
            title: title,
            description: description,
            startDate: startDate,
            endDate: endDate,
            projectId: projectId,
            status: status,
            teamId: teamId,
        }
    })
    return sprint
}

export const getSprint = async (sprintId: string) => {
    const sprint = await prisma.sprint.findUnique({
        where: {
            sprintId: sprintId
        }
    })
    return sprint
}

export const updateSprint = async (sprintId: string, values: any) => {
    const sprint = await prisma.sprint.update({
        where: {
            sprintId: sprintId
        },
        data: values
    })
    return sprint
}