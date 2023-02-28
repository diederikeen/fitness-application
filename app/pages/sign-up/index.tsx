import { getAuth } from "firebase/auth";
import { useState } from "react";

import { Box } from "@/components/Box/Box";
import { AccountInformation } from "@/features/sign-up/accountInformation/AccountInformation";
import { PersonalInformation } from "@/features/sign-up/personalInformation/PersonalInformation";
import { styled } from "@/styles/theme";

const auth = getAuth();

function SignUpPage() {
  const { currentUser } = auth;

  const initialStep = currentUser === null ? 0 : 1;
  const [currentStep, setCurrentStep] = useState(initialStep);

  return (
    <Layout>
      <div className={"content"}>
        <Box css={{ maxWidth: "440px" }}>
          <Box css={{ width: "100%", mb: "$7" }}>
            <h1>Sign up</h1>
            <p>
              Once you've created an account, you'll be able to track your
              workouts, set fitness goals, and connect with friends for added
              motivation. You'll also have access to a variety of workouts and
              exercises tailored to your fitness level and interests.
            </p>
          </Box>
          {currentStep === 0 && (
            <AccountInformation
              onSuccess={() => setCurrentStep((prev) => prev + 1)}
            />
          )}
          {currentStep === 1 && <PersonalInformation />}
        </Box>
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

export default SignUpPage;
