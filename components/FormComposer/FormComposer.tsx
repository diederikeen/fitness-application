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
          containerType: "inline-size",
          display: "grid",
          columnGap: `$${columnGap}`,
          rowGap: `$${rowGap}`,

          ".child-container": {
            gridTemplateColumns: "1fr",
          },

          "@container(min-width: 420px)": {
            ".child-container": {
              gridTemplateColumns: "unset",
              gridAutoFlow: "column",
            },
          },
        }}
      >
        {fields.map((field, index) => {
          const isGroup = Array.isArray(field);
          return isGroup ? (
            <Box
              key={index}
              className="child-container"
              css={{
                display: "grid",
                columnGap: `$${columnGap}`,
                rowGap: `$${rowGap}`,
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
      <Button css={{ mt: "$6" }} type={"submit"}>
        {buttonLabel}
      </Button>
    </form>
  );
}
