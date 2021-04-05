import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import updateEvent from "app/events/mutations/updateEvent"
import { EventForm, FORM_ERROR } from "app/events/components/EventForm"
import { UpdateEvent } from "app/events/utils/vlidations"
import getUserEvent from "app/events/queries/getUserEvent"

export const EditEvent = () => {
  const router = useRouter()
  const slug = useParam("eventSlug", "string")
  const [event, { setQueryData }] = useQuery(getUserEvent, { slug })
  const [updateEventMutation] = useMutation(updateEvent)

  return (
    <>
      <Head>
        <title>Edit Event {event.id}</title>
      </Head>

      <div>
        <h1>Edit Event {event.id}</h1>
        <pre>{JSON.stringify(event)}</pre>

        <EventForm
          submitText="Update Event"
          schema={UpdateEvent}
          initialValues={event}
          onSubmit={async (values) => {
            try {
              const updated = await updateEventMutation({
                id: event.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(`/events/${updated.slug}`)
            } catch (error) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />
      </div>
    </>
  )
}

const EditEventPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditEvent />
      </Suspense>

      <p>
        <Link href="/events">
          <a>Events</a>
        </Link>
      </p>
    </div>
  )
}

EditEventPage.authenticate = true
EditEventPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditEventPage
