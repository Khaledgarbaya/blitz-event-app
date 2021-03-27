import { ReactNode, Suspense, useState } from "react"
import { Head, Link, useMutation } from "blitz"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"

type LayoutProps = {
  title?: string
  children: ReactNode
}
const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (currentUser) {
    return (
      <>
        <div>
          Connected User id: <code>{currentUser.id}</code>
        </div>
        <button
          className="py-2 px-3 bg-purple-400 hover:bg-purple-300 text-gray-900 hover:text-gray-800 rounded transition duration-300"
          onClick={async () => {
            await logoutMutation()
          }}
        >
          Logout
        </button>
      </>
    )
  } else {
    return (
      <>
        <Link href="/login">
          <a
            href=""
            className="block hover:bg-gray-200 md:bg-none md:inline py-2 px-4 md:py-5 md:px-3"
          >
            Login
          </a>
        </Link>
        <Link href="/signup">
          <a
            href=""
            className="block hover:bg-gray-200 md:bg-none md:inline py-2 px-4 md:bg-purple-400 sm:hover:bg-purple-300 text-gray-900 hover:text-gray-800 rounded transition duration-300"
          >
            Signup
          </a>
        </Link>
      </>
    )
  }
}

const Layout = ({ title, children }: LayoutProps) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <Head>
        <title>{title || "blitz-events-app"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <!-- navbar goes here --> */}
      <nav className="bg-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between">
            <div className="flex space-x-4">
              {/* <!-- logo --> */}
              <div>
                <a
                  href="#"
                  className="flex items-center py-5 px-2 text-gray-700 hover:text-gray-900"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="font-bold">Event Blitz</span>
                </a>
              </div>

              {/* <!-- primary nav --> */}
              <div className="hidden md:flex items-center space-x-1">
                <Link href="/events">
                  <a href="" className="py-5 px-3 text-gray-700 hover:text-gray-900">
                    Events
                  </a>
                </Link>
              </div>
            </div>

            {/* <!-- secondary nav --> */}
            <div className="hidden md:flex items-center space-x-1">
              <Suspense fallback="Loading...">
                <UserInfo />
              </Suspense>
            </div>

            {/* <!-- mobile button goes here --> */}
            <div className="md:hidden flex items-center">
              <button onClick={() => setIsOpen(!isOpen)} className="mobile-menu-button">
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* <!-- mobile menu --> */}
        <div className={`mobile-menu ${!isOpen ? "hidden" : ""} md:hidden`}>
          <Link href="/events">
            <a href="" className="block py-2 px-4 text-sm hover:bg-gray-200">
              Events
            </a>
          </Link>
          <Suspense fallback="Loading...">
            <UserInfo />
          </Suspense>
        </div>
      </nav>

      {/* <!-- content goes here --> */}
      <div className="max-w-6xl mx-auto p-8">{children}</div>
    </>
  )
}

export default Layout
