import { UserCredential } from "firebase/auth";

// Check if ReturnType of signInWithGooglePopUp is UserCredential by Type Assertion
export default function checkIsUserCredentialType(
  result: UserCredential | void
): result is UserCredential {
  return (result as UserCredential).user !== undefined;
}
