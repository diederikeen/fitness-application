import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { FormikProvider, useFormik } from "formik";
import * as Yup from "yup";

import { FormComposer, IField } from "@/components/FormComposer/FormComposer";

const auth = getAuth();

interface Props {
  onSuccess: () => void;
}

export function AccountInformation({ onSuccess }: Props) {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validateOnBlur: true,
    validateOnChange: false,
    validationSchema: signUpValidationSchema,
    onSubmit: async (values) => await onSignupSubmit(values, onSuccess),
  });

  return (
    <FormikProvider value={formik}>
      <FormComposer fields={signupFormFields} buttonLabel={"Let's go"} />
    </FormikProvider>
  );
}

async function onSignupSubmit(
  values: Yup.InferType<typeof signUpValidationSchema>,
  onSuccess: Props["onSuccess"]
) {
  return await submitSignUpForm(values, onSuccess);
}

async function submitSignUpForm(
  values: Yup.InferType<typeof signUpValidationSchema>,
  successCallback: () => void
) {
  await createUserWithEmailAndPassword(auth, values.email, values.password);

  successCallback();
}

const signUpValidationSchema = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string().required().min(8),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords don't match")
    .required(),
});

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
