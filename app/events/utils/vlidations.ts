import * as z from "zod"

export const CreateEvent = z
  .object({
    name: z.string().nonempty("The name field is required"),
    slug: z
      .string()
      .regex(
        /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
        "Please enter a valid 'slug' consisting of letters, numbers,underscores or hyphens"
      )
      .nonempty("The slug field is required"),
    description: z.string().optional(),
    content: z.string().optional(),
    time: z.date(),
  })
  .nonstrict()

export const UpdateEvent = z
  .object({
    name: z.string().nonempty("The name field is required"),
    slug: z
      .string()
      .regex(
        /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
        "Please enter a valid 'slug' consisting of letters, numbers,underscores or hyphens"
      )
      .nonempty("The slug field is required"),
    description: z.string().nullable(),
    content: z.string().nullable(),
    time: z.date().nullable(),
  })
  .nonstrict()
