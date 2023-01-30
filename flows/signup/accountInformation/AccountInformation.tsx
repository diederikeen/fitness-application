import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import {
  FormComposer,
  IField,
} from "../../../components/FormComposer/FormComposer";

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
  return await createUserWithEmailAndPassword(
    auth,
    values.email,
    values.password
  )
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // @TODO: Create api call to own database and write user
      // in here we create a new user in our own database
      successCallback();
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      // @TODO: Create notification component
      console.log({ errorCode, errorMessage });
    });
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
    layout: "half",
  },

  {
    name: "password",
    type: "password",
    label: "Password",
    layout: "half",
  },

  {
    name: "confirmPassword",
    type: "password",
    label: "Confirm password",
  },
];
