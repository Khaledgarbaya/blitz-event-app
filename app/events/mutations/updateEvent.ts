import { resolver } from "blitz"
import db from "db"
import { UpdateEvent } from "app/events/utils/vlidations"

export default resolver.pipe(
  resolver.zod(UpdateEvent),
  resolver.authorize(),
  async ({ id, ...data }) => {
    const event = await db.event.update({ where: { id }, data })

    return event
  }
)
