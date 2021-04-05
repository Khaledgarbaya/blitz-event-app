import Layout from "app/core/layouts/Layout"
import { BlitzPage, Head, Link, usePaginatedQuery, useRouter } from "blitz"
import React, { Suspense } from "react"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import getUserEvents from "app/users/queries/getUserEvents"

const DeatiledUserInfo = () => {
  const currentUser = useCurrentUser()
  if (currentUser) {
    return (
      <div>
        <Head>
          <title>User | {currentUser.name}</title>
        </Head>
        <div className="space-y-2">
          <div>
            <span className="font-bold">Name:</span> <span> {currentUser.name}</span>
          </div>
          <div>
            <span className="font-bold">Email:</span> <span>{currentUser.email}</span>
          </div>

          <div>
            <span className="font-bold">Password:</span> <span>************</span>
          </div>
          <Link href="/users/me/edit">
            <div className="flex">
              <svg
                className="w-6 h-6 mr-1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                <path
                  fillRule="evenodd"
                  d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                  clipRule="evenodd"
                />
              </svg>
              <a href="">Edit Information</a>
            </div>
          </Link>
        </div>
      </div>
    )
  }
  return null
}

const ITEMS_PER_PAGE = 100

export const UserEvents = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ events, hasMore }] = usePaginatedQuery(getUserEvents, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul className="grid grid-cols-3 gap-4 mb-6">
        {events.map((event) => (
          <li className="shadow-lg bg-gray-100 rounded-lg bg-white" key={event.id}>
            <Link href={`/events/${event.slug}/edit`}>
              <a className="block w-full h-full p-16">{event.name}</a>
            </Link>
          </li>
        ))}
      </ul>

      <div className="w-full flex justify-between">
        <button
          className={`${
            page === 0 ? "hidden" : ""
          } py-1 px-2 bg-purple-400 hover:bg-purple-300 text-gray-900 hover:text-gray-800 rounded transition duration-300`}
          disabled={page === 0}
          onClick={goToPreviousPage}
        >
          Previous
        </button>
        <button
          className={`${
            !hasMore ? "hidden" : ""
          } py-1 px-2 bg-purple-400 hover:bg-purple-300 text-gray-900 hover:text-gray-800 rounded transition duration-300`}
          disabled={!hasMore}
          onClick={goToNextPage}
        >
          Next
        </button>
      </div>
    </div>
  )
}

const UserPage: BlitzPage = () => {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-900">Dashboard</h1>
      <section aria-labelledby="user-dashboard" className="mt-6">
        <div className="p-8 bg-white shadow sm:rounded-lg  min-h-screen space-y-5  divide-y divide-gray-500">
          <div className="p-5">
            <Suspense fallback="Loading user info...">
              <DeatiledUserInfo />
            </Suspense>
          </div>
          <div className="p-5">
            <Suspense fallback="Loading user info...">
              <UserEvents />
            </Suspense>
          </div>
        </div>
      </section>
    </div>
  )
}

UserPage.authenticate = true
UserPage.getLayout = (page) => <Layout>{page}</Layout>

export default UserPage
