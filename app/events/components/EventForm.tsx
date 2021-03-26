import { Form, FormProps } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import * as z from "zod"
export { FORM_ERROR } from "app/core/components/Form"

export function EventForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  return (
    <Form<S> {...props}>
      <LabeledTextField name="name" label="Name" placeholder="Name" />
      <LabeledTextField name="slug" label="Slug" placeholder="my-slug" />
      <LabeledTextField
        name="description"
        label="Description"
        placeholder="some short description about the event"
      />
      <LabeledTextField name="content" label="Content" placeholder="content" type="textarea" />
      <LabeledTextField
        name="time"
        label="Time"
        placeholder="when is this happening"
        type="datetime-local"
      />
    </Form>
  )
}
