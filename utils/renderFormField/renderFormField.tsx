import { Field } from "formik";

import { CheckboxInput } from "@/components/CheckboxInput/CheckboxInput";
import { IField } from "@/components/FormComposer/FormComposer";
import { SelectBox } from "@/components/SelectBox/SelectBox";
import { TextInput } from "@/components/TextInput/TextInput";

export function renderFormField(field: IField, error: string, touched: string) {
  let Component;

  switch (field.type) {
    case "text":
    case "number":
    case "date":
      Component = TextInput;
      break;
    case "checkbox":
      Component = CheckboxInput;
      break;
    case "select":
      Component = SelectBox;
      break;
    default:
      Component = TextInput;
  }
  return (
    <div key={field.name}>
      <Field {...field} error={error} touched={touched} component={Component} />
    </div>
  );
}
