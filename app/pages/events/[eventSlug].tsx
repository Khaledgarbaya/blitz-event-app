import { Suspense, useEffect, useState } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation } from "blitz"
import Layout from "app/core/layouts/Layout"
import getEvent from "app/events/queries/getEvent"
import getCurrentUserRSVP from "app/rsvps/queries/getCurrentUserRSVP"
import createRSVP from "app/rsvps/mutations/createRSVP"

const RSVPButton = ({ eventId }) => {
  const [rsvp] = useQuery(getCurrentUserRSVP, { eventId })
  const [createRSVPMutation] = useMutation(createRSVP)
  const [isGoing, setIsGoing] = useState(false)

  useEffect(() => {
    if (rsvp) {
      setIsGoing(true)
    }
  }, [])

  if (isGoing) {
    return (
      <button
        type="button"
        disabled
        className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Going
      </button>
    )
  }
  return (
    <button
      type="button"
      onClick={async () => {
        const newRsvp = await createRSVPMutation({ eventId })
        if (newRsvp) {
          setIsGoing(true)
        }
      }}
      className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
      RSVP
    </button>
  )
}

export const Event = () => {
  const slug = useParam("eventSlug", "string")
  const [event] = useQuery(getEvent, { slug })

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <Head>
        <title>Event | {event.name}</title>
      </Head>

      <div>
        <h1 className="text-4xl font-bold text-gray-900"> {event.name}</h1>
        <p className="text-sm font-medium text-gray-500">{event.description}</p>

        <div className="mt-8 max-w-3xl mx-auto grid grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
          <div className="space-y-6 lg:col-start-1 lg:col-span-2">
            {/* <!-- Description list--> */}
            <section aria-labelledby="event-information-title">
              <div className="bg-white shadow sm:rounded-lg  min-h-screen">
                <div className="px-4 py-5 sm:px-6">
                  <h2
                    id="applicant-information-title"
                    className="text-lg leading-6 font-medium text-gray-900"
                  >
                    Event Information
                  </h2>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">{event.content}</p>
                </div>
              </div>
            </section>
          </div>
          <section aria-labelledby="timeline-title" className="lg:col-start-3 lg:col-span-1">
            <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6  min-h-screen">
              <h2 id="timeline-title" className="text-lg font-medium text-gray-900">
                RSVPs
              </h2>
              <div className="mt-6 flex flex-col justify-stretch">
                <Suspense fallback="loading...">
                  <RSVPButton eventId={event.id} />
                </Suspense>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

const ShowEventPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Event />
      </Suspense>
    </div>
  )
}

ShowEventPage.authenticate = true
ShowEventPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowEventPage
