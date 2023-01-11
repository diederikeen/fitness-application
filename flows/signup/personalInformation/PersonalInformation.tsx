import { FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import {
  FormComposer,
  IField,
} from "../../../components/FormComposer/FormComposer";

interface Props {
  onSuccess: () => void;
}

export function PersonalInformation({ onSuccess }: Props) {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      streetName: "",
      zipcode: "",
      city: "",
      country: "",
    },
    validateOnBlur: true,
    validateOnChange: false,
    validationSchema: personalInfoValidationSchema,
    onSubmit: async (values) => await onSignupSubmit(values),
  });

  return (
    <FormikProvider value={formik}>
      <FormComposer fields={personalInfoFields} buttonLabel={"Sign up"} />
    </FormikProvider>
  );
}

async function onSignupSubmit({
  streetName,
  zipcode,
  city,
  country,
}: {
  streetName: string;
  zipcode: string;
  city: string;
  country: string;
}) {
  return setTimeout(() => console.log("submitted"), 500);
}

const personalInfoFields: IField[][] = [
  [
    {
      name: "firstName",
      type: "text",
      label: "First name",
    },
    {
      name: "lastName",
      type: "text",
      label: "Last name",
    },
  ],

  [
    {
      name: "zipcode",
      type: "text",
      label: "Zipcode",
    },
    {
      name: "streetName",
      type: "text",
      label: "Street name",
    },
  ],
  [
    {
      name: "city",
      type: "text",
      label: "City",
    },
    {
      name: "country",
      type: "text",
      label: "country",
    },
  ],
];

const personalInfoValidationSchema = Yup.object({
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
  zipcode: Yup.string().required(),
  streetName: Yup.string().required(),
  city: Yup.string().required(),
  country: Yup.string().required(),
});
