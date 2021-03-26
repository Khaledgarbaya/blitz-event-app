import { forwardRef, PropsWithoutRef } from "react"
import { useField } from "react-final-form"
import { format, parse } from "date-fns"
import { utcToZonedTime } from "date-fns-tz"
export interface LabeledTextFieldProps extends PropsWithoutRef<JSX.IntrinsicElements["input"]> {
  /** Field name. */
  name: string
  /** Field label. */
  label: string
  /** Field type. Doesn't include radio buttons and checkboxes */
  type?: "text" | "password" | "email" | "number" | "textarea" | "datetime-local"
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
}

export const LabeledTextField = forwardRef<HTMLInputElement, LabeledTextFieldProps>(
  ({ name, label, outerProps, ...props }, ref) => {
    const {
      input,
      meta: { touched, error, submitError, submitting },
    } = useField(name, {
      format: (value) => {
        if (props.type === "number") return Number(value)
        if (props.type === "datetime-local") {
          console.log(value)
          if (!(value instanceof Date)) return format(new Date(value), "yyyy-MM-dd'T'HH:mm:ss.SSS")
          return format(utcToZonedTime(value, "etc/UTC"), "MM/dd/yyyy")
        }
        return value
      },
      parse: (value) => {
        if (props.type === "number") return Number(value)
        if (props.type === "datetime-local") {
          const res = parse(value, "MM/dd/yyyy", new Date())
          if (isNaN(res.getTime())) {
            return new Date(value).toISOString()
          }
          return res as any
        }
        return value
      },
    })

    const normalizedError = Array.isArray(error) ? error.join(", ") : error || submitError

    return (
      <div {...outerProps}>
        <label>
          {label}
          <input {...input} disabled={submitting} {...props} ref={ref} />
        </label>

        {touched && normalizedError && (
          <div role="alert" style={{ color: "red" }}>
            {normalizedError}
          </div>
        )}

        <style jsx>{`
          label {
            display: flex;
            flex-direction: column;
            align-items: start;
            font-size: 1rem;
          }
          input {
            font-size: 1rem;
            padding: 0.25rem 0.5rem;
            border-radius: 3px;
            border: 1px solid purple;
            appearance: none;
            margin-top: 0.5rem;
          }
        `}</style>
      </div>
    )
  }
)

export default LabeledTextField
