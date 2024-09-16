import { object, string, number, optional } from "zod"

export const webAuthnSchema = object({
    email: string({ required_error: "Email is required" })
      .min(1, "Email is required")
      .email("Invalid email"),
  })

export const NewOrgSchema = object({
  name: string({ required_error: "Your organisation must have a name." })
    .min(3, "Name must be at least 3 characters long")
})