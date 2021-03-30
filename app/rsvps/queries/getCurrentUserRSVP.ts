import db from "db"
import { Ctx } from "blitz"

const getCurrentUserRSVP = async ({ eventId }, ctx: Ctx) => {
  const rsvp = await db.rsvp.findFirst({
    where: { AND: { eventId: eventId, attendeeId: ctx.session.userId! } },
  })
  return rsvp
}

export default getCurrentUserRSVP
