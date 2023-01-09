import { getAuth } from "firebase/auth";
import * as Yup from "yup";

import { styled } from "../styles/theme";
import { FormikProvider, useFormik } from "formik";
import { FormComposer, IField } from "../components/FormComposer/FormComposer";

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const auth = getAuth();

const Layout = styled("div", {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
});

const signupFormFields: IField[][] = [
  [
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
  ],
  [
    {
      name: "confirmPassword",
      type: "password",
      label: "Confirm password",
    },
  ],
];

const signUpValidationSchema = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string().required().min(8),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords don't match")
    .required(),
});

export default function HomePage() {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validateOnBlur: true,
    validationSchema: signUpValidationSchema,
    onSubmit: async (values) => await onSubmit(),
  });

  async function onSubmit() {
    // return await signInWithEmailAndPassword(auth, email, password)
    //   .then((userCredential) => {
    //     // Signed in
    //     const user = userCredential.user;
    //     // ...
    //   })
    //   .catch((error) => {
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //   });
  }

  return (
    <Layout>
      <div>
        <FormikProvider value={formik}>
          <FormComposer fields={signupFormFields} buttonLabel={"Sign up"} />
        </FormikProvider>
      </div>
      <div>This is going to be visual</div>
    </Layout>
  );
}
