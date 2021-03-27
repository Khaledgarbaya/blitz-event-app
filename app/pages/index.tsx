import { Suspense } from "react"
import { Link, BlitzPage, useMutation } from "blitz"
import Layout from "app/core/layouts/Layout"

const Home: BlitzPage = () => {
  return (
    <div>
      <main className="mx-auto container p-6">
        <h1 className="text-6xl text-center">Event app</h1>
        <div></div>
      </main>
    </div>
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
