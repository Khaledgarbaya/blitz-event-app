import { resolver } from "blitz"
import db from "db"
import { UpdateCurrentUser } from "app/users/utils/validations"

export default resolver.pipe(
  resolver.zod(UpdateCurrentUser),
  resolver.authorize(),
  async ({ id, ...data }) => {
    const user = await db.user.update({ where: { id }, data })

    return user
  }
)
