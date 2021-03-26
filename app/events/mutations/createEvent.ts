import { resolver, Ctx } from "blitz"
import db from "db"
import { CreateEvent } from "app/events/utils/vlidations"

export default resolver.pipe(
  resolver.zod(CreateEvent),
  resolver.authorize(),
  async (input, { session }: Ctx) => {
    const event = await db.event.create({ data: { ...input, userId: session.userId! } })

    return event
  }
)
