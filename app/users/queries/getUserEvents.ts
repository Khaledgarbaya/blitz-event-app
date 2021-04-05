import { Ctx, paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetEventsInput
  extends Pick<Prisma.EventFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  async ({ where, orderBy, skip = 0, take = 100 }: GetEventsInput, ctx: Ctx) => {
    const { items: events, hasMore, nextPage, count } = await paginate({
      skip,
      take,
      count: () => db.event.count({ where: { ...where, userId: ctx.session.userId! } }),
      query: (paginateArgs) =>
        db.event.findMany({
          ...paginateArgs,
          where: { ...where, userId: ctx.session.userId! },
          orderBy,
        }),
    })

    return {
      events,
      nextPage,
      hasMore,
      count,
    }
  }
)
