import { Link, useRouter, useMutation, BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import createEvent from "app/events/mutations/createEvent"
import { EventForm, FORM_ERROR } from "app/events/components/EventForm"
import { CreateEvent } from "app/events/utils/vlidations"

const NewEventPage: BlitzPage = () => {
  const router = useRouter()
  const [createEventMutation] = useMutation(createEvent)

  return (
    <div>
      <h1>Create New Event</h1>

      <EventForm
        submitText="Create Event"
        schema={CreateEvent}
        initialValues={{}}
        onSubmit={async (values) => {
          try {
            const event = await createEventMutation(values)
            router.push(`/events/${event.id}`)
          } catch (error) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href="/events">
          <a>Events</a>
        </Link>
      </p>
    </div>
  )
}

NewEventPage.authenticate = true
NewEventPage.getLayout = (page) => <Layout title={"Create New Event"}>{page}</Layout>

export default NewEventPage
