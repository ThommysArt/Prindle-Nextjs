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

export const getTasks = async (taskId: string) => {
    const task = await prisma.sprintTask.findUnique({
        where: {
            sprintTaskId: taskId
        }
    })
    return task
}

export const updateTask = async (taskId: string, values: any) => {
    const task = await prisma.sprintTask.update({
        where: {
            sprintTaskId: taskId
        },
        data: values
    })
    return task;
}
