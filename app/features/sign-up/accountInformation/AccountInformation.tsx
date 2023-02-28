import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { FormikProvider, useFormik } from "formik";
import z from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

import { FormComposer, IField } from "@/components/FormComposer/FormComposer";

const auth = getAuth();

interface Props {
  onSuccess: () => void;
}

const accountInformationSchema = z
  .object({
    email: z.string().email("This doesn't look like an email"),
    password: z.string().min(6, {
      message: "Password should be a minimal of 6 characters",
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.confirmPassword === data.password, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export function AccountInformation({ onSuccess }: Props) {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: toFormikValidationSchema(accountInformationSchema),
    onSubmit: async (values) => await onSignupSubmit(values, onSuccess),
  });

  return (
    <FormikProvider value={formik}>
      <FormComposer fields={signupFormFields} buttonLabel={"Let's go"} />
    </FormikProvider>
  );
}

async function onSignupSubmit(
  values: z.infer<typeof accountInformationSchema>,
  onSuccess: Props["onSuccess"]
) {
  return await submitSignUpForm(values, onSuccess);
}

async function submitSignUpForm(
  values: z.infer<typeof accountInformationSchema>,
  successCallback: () => void
) {
  await createUserWithEmailAndPassword(auth, values.email, values.password);

  successCallback();
}

const signupFormFields: IField[] = [
  {
    name: "email",
    type: "email",
    label: "E-mail",
  },

  {
    name: "password",
    type: "password",
    label: "Password",
  },

  {
    name: "confirmPassword",
    type: "password",
    label: "Confirm password",
  },
];
