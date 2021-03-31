import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import getEvents from "app/events/queries/getEvents"

const ITEMS_PER_PAGE = 100

export const EventsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ events, hasMore }] = usePaginatedQuery(getEvents, {
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
            <Link href={`/events/${event.slug}`}>
              <a className="block w-full h-full p-16">{event.name}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const EventsPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Events</title>
      </Head>

      <div className="p-8 bg-gray-100 min-h-screen">
        <h1 className="text-4xl font-bold text-gray-900">Events</h1>
        <section aria-labelledby="user-information" className="mt-6">
          <div className="p-8 bg-white shadow sm:rounded-lg  min-h-screen space-y-2">
            <Suspense fallback="Loading user info...">
              <EventsList />
            </Suspense>
          </div>
        </section>
      </div>
    </>
  )
}

EventsPage.authenticate = false
EventsPage.getLayout = (page) => <Layout>{page}</Layout>

export default EventsPage
