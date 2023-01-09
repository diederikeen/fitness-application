import { useFormikContext } from "formik";
import { Box } from "../Box/Box";
import { Button } from "../Button/Button";
import { renderFormField } from "../../utils/renderFormField/renderFormField";

export interface IField {
  name: string;
  type: "select" | "text" | "password" | "number" | "email";
  label?: string;
  layout?: "full" | "half" | "quarter";
}

interface Props {
  fields: IField[] | IField[][];
  columnGap?: number;
  rowGap?: number;
  buttonLabel?: string;
}

export function FormComposer({
  fields,
  buttonLabel = "Submit",
  columnGap = 3,
  rowGap = 5,
}: Props) {
  const formContext = useFormikContext();
  const { errors, touched } = formContext as unknown as Record<string, any>;
  return (
    <form onSubmit={formContext.handleSubmit}>
      <Box
        css={{
          display: "grid",
          columnGap: `$${columnGap}`,
          rowGap: `$${rowGap}`,
        }}
      >
        {fields.map((field) => {
          const isGroup = Array.isArray(field);
          return isGroup ? (
            <Box
              css={{
                display: "grid",
                columnGap: `$${columnGap}`,
                rowGap: `$${rowGap}`,
                gridTemplateColumns: `repeat(${field.length}, 1fr)`,
              }}
            >
              {field.map((childField) =>
                renderFormField(
                  childField,
                  errors[childField.name],
                  touched[childField.name]
                )
              )}
            </Box>
          ) : (
            renderFormField(field, errors[field.name], touched[field.name])
          );
        })}
      </Box>
      <Button css={{ mt: "$5" }} type={"submit"}>
        {buttonLabel}
      </Button>
    </form>
  );
}
