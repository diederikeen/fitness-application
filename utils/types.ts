import { User } from "@firebase/auth-types";

export interface IFirebaseUser extends User {}

export interface IUserSignUpFormValues {
  firstName: string;
  lastName: string;
  zipcode: string;
  country: string;
  city: string;
  streetName: string;
}

export interface IUserPayload {
  uid: string;
  photoUrl: string | null;
  email: string;
}

export interface IWeightRecord {
  date: Date;
  weight: number;
  note?: string;
  id: number;
}

export interface ICreatedUser
  extends Pick<IUserSignUpFormValues, "firstName" | "lastName">,
    IUserPayload,
    IWeightRecord {}
