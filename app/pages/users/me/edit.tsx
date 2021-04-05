import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import Layout from "app/core/layouts/Layout"
import { FORM_ERROR, UserForm } from "app/users/components/UserForm"
import updateCurrentUser from "app/users/mutations/updateCurrentUser"
import getCurrentUser from "app/users/queries/getCurrentUser"
import { UpdateCurrentUser } from "app/users/utils/validations"
import { BlitzPage, Head, useMutation, useQuery, useRouter } from "blitz"
import React, { Suspense } from "react"

const EditUser = () => {
  const router = useRouter()
  const [currentUser, { setQueryData }] = useQuery(getCurrentUser, null)
  const [updateUserMutation] = useMutation(updateCurrentUser)
  if (currentUser) {
    return (
      <>
        <Head>
          <title>Edit User {currentUser.name}</title>
        </Head>
        <div>
          <UserForm
            submitText="Update Event"
            schema={UpdateCurrentUser}
            initialValues={currentUser}
            onSubmit={async (values) => {
              try {
                const updated = await updateUserMutation({
                  id: currentUser.id,
                  ...values,
                })
                await setQueryData(updated)
                router.push(`/users/me`)
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
  return null
}
const EditCurrentUserPage: BlitzPage = () => {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-900">Edit Information</h1>
      <section aria-labelledby="user-information" className="mt-6">
        <div className="p-8 bg-white shadow sm:rounded-lg  min-h-screen space-y-2">
          <Suspense fallback="Loading user info...">
            <EditUser />
          </Suspense>
        </div>
      </section>
    </div>
  )
}

EditCurrentUserPage.authenticate = true
EditCurrentUserPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditCurrentUserPage
