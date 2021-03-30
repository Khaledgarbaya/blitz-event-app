import { resolver, Ctx } from "blitz"
import db from "db"
import * as z from "zod"

const CreateRSVP = z.object({
  eventId: z.number(),
})

export default resolver.pipe(
  resolver.zod(CreateRSVP),
  resolver.authorize(),
  async (input, { session }: Ctx) => {
    const rsvp = await db.rsvp.create({ data: { ...input, attendeeId: session.userId! } })

    return rsvp
  }
)
