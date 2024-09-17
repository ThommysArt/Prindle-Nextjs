"use server"

import { prisma } from "@/prisma/prisma"

export const addTask = async (title: string, description: string, startDate: Date, endDate: Date, status: string, sprintId: string) => {
    const task = await prisma.sprintTask.create({
        data: {
            title: title,
            description: description,
            startDate: startDate,
            endDate: endDate,
            status: status,
            sprintId: sprintId
        }
    })
    return task;
}