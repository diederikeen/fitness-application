import { Field } from "formik";

import { IField } from "@/components/FormComposer/FormComposer";
import { TextInput } from "@/components/TextInput/TextInput";

export function renderFormField(field: IField, error: string, touched: string) {
  const Component = field.type === "select" ? null : TextInput;

  return (
    <div key={field.name}>
      <Field {...field} error={error} touched={touched} component={Component} />
    </div>
  );
}
