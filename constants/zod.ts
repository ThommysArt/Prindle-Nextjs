import { object, string, number, optional, date } from "zod"
import * as z from "zod"

export const webAuthnSchema = object({
    email: string({ required_error: "Email is required" })
      .min(1, "Email is required")
      .email("Invalid email"),
  })

export const NewOrgSchema = object({
  name: string({ required_error: "Your organisation must have a name." })
    .min(3, "Name must be at least 3 characters long")
})

export const NewTeamSchema = object({
  name: string({ required_error: "Your team must have a name." })
    .min(3, "Name must be at least 3 characters long"),
  description: string({ required_error: "Your team must have a description." })
    .min(20, "Team description must exceed 20 characters.")
})

export const NewProjectSchema = object({
  name: string({ required_error: "Your Project must have a name." })
    .min(3, "Name must be at least 3 characters long"),
  description: string({ required_error: "Your Project must have a description." })
    .min(30, "Project description must exceed 20 characters."),
  orgId: string({ required_error: "You need to choose an organisation for your project"})
})

export const sprintSchema = object({
  title: string().min(1, 'Title is required'),
  description: string(),
  startDate: date(),
  endDate: date(),
  teamId: string(),
  status: z.enum(['TODO', 'IN_PROGRESS', 'DONE']),
})

export const taskSchema = object({
  title: string().min(1, 'Title is required'),
  description: string(),
  startDate: date(),
  endDate: date(),
  status: z.enum(['TODO', 'IN_PROGRESS', 'DONE']),
})