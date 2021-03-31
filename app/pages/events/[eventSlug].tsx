import { Suspense, useEffect, useState } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation } from "blitz"
import Layout from "app/core/layouts/Layout"
import getEvent from "app/events/queries/getEvent"
import getCurrentUserRSVP from "app/rsvps/queries/getCurrentUserRSVP"
import createRSVP from "app/rsvps/mutations/createRSVP"
import deleteRSVP from "app/rsvps/mutations/deleteRSVP"

const RSVPButton = ({ eventId }) => {
  const [rsvp] = useQuery(getCurrentUserRSVP, { eventId })
  const [createRSVPMutation] = useMutation(createRSVP)
  const [deleteRSVPMutation] = useMutation(deleteRSVP)
  const [isGoing, setIsGoing] = useState(!!rsvp)

  if (isGoing) {
    return (
      <>
        <div className="flex items-center space-x-1 mb-3 text-green-600">
          <svg
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <span className="block">Going</span>
        </div>
        <button
          type="button"
          onClick={async () => {
            const deletion = await deleteRSVPMutation({ eventId })
            if (deletion) {
              setIsGoing(false)
            }
          }}
          className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Cancel RSVP
        </button>
      </>
    )
  }
  return (
    <>
      <div className="flex items-center space-x-1 mb-3 text-yellow-600">
        <svg
          className="w-6 h-6"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z"
            clipRule="evenodd"
          />
        </svg>
        <span className="block">Not Going</span>
      </div>
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
    </>
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
