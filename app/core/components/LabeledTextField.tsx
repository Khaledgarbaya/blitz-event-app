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
          if (!value) return undefined
          if (!(value instanceof Date)) {
            return format(new Date(value), "yyyy-MM-dd'T'HH:mm:ss.SSS")
          }
          return format(utcToZonedTime(value, "etc/UTC"), "yyyy-MM-dd'T'HH:mm:ss.SSS")
        }
        return value
      },
      parse: (value) => {
        if (props.type === "number") return Number(value)
        if (props.type === "datetime-local") {
          const res = parse(value, "MM/dd/yyyy", new Date())
          if (isNaN(res.getTime())) {
            return new Date(value)
          }
          return res as any
        }
        return value
      },
    })

    const normalizedError = Array.isArray(error) ? error.join(", ") : error || submitError

    return (
      <div {...outerProps}>
        <label className="block text-sm font-medium text-gray-700">
          {label}
          <div className="mt-1">
            <input
              className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 rounded-md"
              {...input}
              disabled={submitting}
              {...props}
              ref={ref}
            />
          </div>
        </label>

        {touched && normalizedError && (
          <div role="alert" style={{ color: "red" }}>
            {normalizedError}
          </div>
        )}
      </div>
    )
  }
)

export default LabeledTextField
