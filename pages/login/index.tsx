import { signInWithEmailAndPassword } from "@firebase/auth";
import { FormikProvider, useFormik } from "formik";
import { useRouter } from "next/router";
import z from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

import { Box } from "@/components/Box/Box";
import { FormComposer, IField } from "@/components/FormComposer/FormComposer";
import { auth } from "@/libs/firebase";
import { styled } from "@/styles/theme";
import { useToast } from "@/utils/useToast/useToast";

function LoginPage() {
  const router = useRouter();
  const { addToast } = useToast();

  async function onLoginSubmit(
    values: z.infer<typeof loginValidationSchema>,
    onLoginSuccess: () => Promise<boolean>
  ) {
    return await signInWithEmailAndPassword(auth, values.email, values.password)
      .then(async () => await onLoginSuccess())
      .catch((error) => {
        const errorMessage = error.message;
        addToast({ message: errorMessage, state: "error" });
      });
  }

  async function onLoginSuccess() {
    return await router.push("/dashboard");
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validateOnBlur: true,
    validationSchema: toFormikValidationSchema(loginValidationSchema),
    onSubmit: async (values) => await onLoginSubmit(values, onLoginSuccess),
  });

  return (
    <Layout>
      <div className={"content"}>
        <Box css={{ maxWidth: "440px" }}>
          <Box css={{ width: "100%", mb: "$7" }}>
            <h1>Login</h1>
            <p>Welcome back! Please login to continue with your journey.</p>

            <FormikProvider value={formik}>
              <FormComposer
                fields={loginFormFields}
                buttonLabel={"Log me in"}
              />
            </FormikProvider>
          </Box>
        </Box>
      </div>
      <VisualSection>
        <div className={"content"}></div>
      </VisualSection>
    </Layout>
  );
}

const loginValidationSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const loginFormFields: IField[] = [
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
];

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

export default LoginPage;
