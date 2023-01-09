import { getAuth } from "firebase/auth";
import * as Yup from "yup";

import { styled } from "../styles/theme";
import { FormikProvider, useFormik } from "formik";
import { FormComposer, IField } from "../components/FormComposer/FormComposer";
import { Box } from "../components/Box/Box";

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const auth = getAuth();

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
    validateOnChange: false,
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
      <div className={"content"}>
        <Box css={{ width: "100%", mb: "$5" }}>
          <h1>Sign up</h1>

          <p>
            Once you've created an account, you'll be able to track your
            workouts, set fitness goals, and connect with friends for added
            motivation. You'll also have access to a variety of workouts and
            exercises tailored to your fitness level and interests.
          </p>
        </Box>
        <FormikProvider value={formik}>
          <FormComposer fields={signupFormFields} buttonLabel={"Sign up"} />
        </FormikProvider>
      </div>
      <VisualSection>
        <div className={"content"}></div>
      </VisualSection>
    </Layout>
  );
}

const VisualSection = styled("div", {
  backgroundColor: "$primaryColor",
  color: "$white",
});

const Layout = styled("div", {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",

  ".content": {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    px: "$4",

    "@bp2": {
      px: "$6",
    },
  },
});
