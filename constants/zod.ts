import { object, string, number, optional } from "zod"

export const webAuthnSchema = object({
    email: string({ required_error: "Email is required" })
      .min(1, "Email is required")
      .email("Invalid email"),
  })