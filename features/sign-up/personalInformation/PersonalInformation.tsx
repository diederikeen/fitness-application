import axios from "axios";
import { getAuth } from "firebase/auth";
import { FormikProvider, useFormik } from "formik";
import { useRouter } from "next/router";
import * as Yup from "yup";

import { FormComposer, IField } from "@/components/FormComposer/FormComposer";
import {
  IFirebaseUser,
  IUserPayload,
  IUserSignUpFormValues,
} from "@/utils/types";

const auth = getAuth();

export function PersonalInformation() {
  const router = useRouter();
  // accessing currentUser from auth from the first step
  // see AccountInformation.tsx
  const currentUser = auth.currentUser as IFirebaseUser;

  if (currentUser == null) {
    return <>No user found</>;
  }

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
    onSubmit: async (values) => {
      if (currentUser.email === null) {
        throw new Error("User email not found");
      }

      await onSignupSubmit(values, {
        uid: currentUser?.uid,
        photoUrl: currentUser?.photoURL,
        email: currentUser?.email,
      });

      await router.push("/dashboard");
    },
  });

  return (
    <FormikProvider value={formik}>
      <FormComposer fields={personalInfoFields} buttonLabel={"Sign up"} />
    </FormikProvider>
  );
}

async function onSignupSubmit(
  formValues: IUserSignUpFormValues,
  user: IUserPayload
) {
  return await axios
    .post("/api/user/create-user", {
      userDetails: formValues,
      user,
    })
    .then((res) => res)
    .catch((error) => console.error(error));
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
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  zipcode: Yup.string().required("Zipcode is required"),
  streetName: Yup.string().required("Street name is required"),
  city: Yup.string().required("City is required"),
  country: Yup.string().required("Country is required"),
});
