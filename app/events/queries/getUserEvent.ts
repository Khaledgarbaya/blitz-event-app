import { resolver, NotFoundError, Ctx } from "blitz"
import db from "db"
import * as z from "zod"

const GetEvent = z.object({
  slug: z.string().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetEvent), async ({ slug }, ctx: Ctx) => {
  const event = await db.event.findFirst({ where: { slug, userId: ctx.session.userId! } })

  if (!event) throw new NotFoundError()

  return event
})
