import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation } from "blitz"
import Layout from "app/core/layouts/Layout"
import getEvent from "app/events/queries/getEvent"
import deleteEvent from "app/events/mutations/deleteEvent"

export const Event = () => {
  const router = useRouter()
  const eventId = useParam("eventId", "number")
  const [deleteEventMutation] = useMutation(deleteEvent)
  const [event] = useQuery(getEvent, { id: eventId })

  return (
    <>
      <Head>
        <title>Event | {event.name}</title>
      </Head>

      <div>
        <h1>Event {event.id}</h1>
        <pre>{JSON.stringify(event, null, 2)}</pre>

        <Link href={`/events/${event.id}/edit`}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteEventMutation({ id: event.id })
              router.push("/events")
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  )
}

const ShowEventPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href="/events">
          <a>Events</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Event />
      </Suspense>
    </div>
  )
}

ShowEventPage.authenticate = true
ShowEventPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowEventPage
