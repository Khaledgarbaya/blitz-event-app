import { resolver, NotFoundError } from "blitz"
import db from "db"
import * as z from "zod"

const GetEvent = z.object({
  slug: z.string().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetEvent), async ({ slug }) => {
  const event = await db.event.findFirst({ where: { slug } })

  if (!event) throw new NotFoundError()

  return event
})
