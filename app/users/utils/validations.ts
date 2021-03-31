import * as z from "zod"

export const UpdateCurrentUser = z
  .object({
    name: z.string().nullable(),
    email: z.string().email().nonempty("The email field is required"),
  })
  .nonstrict()
