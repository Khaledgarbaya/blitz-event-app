import { resolver, Ctx } from "blitz"
import db from "db"
import * as z from "zod"

const DeleteRSVP = z.object({
  eventId: z.number(),
})

export default resolver.pipe(
  resolver.zod(DeleteRSVP),
  resolver.authorize(),
  async ({ eventId }, { session }: Ctx) => {
    const rsvp = await db.rsvp.delete({
      where: { attendeeId_eventId: { eventId, attendeeId: session.userId! } },
    })
    return rsvp
  }
)
