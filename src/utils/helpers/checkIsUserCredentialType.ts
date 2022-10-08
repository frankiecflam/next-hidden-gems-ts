import { UserCredential } from "firebase/auth";

// Check if ReturnType of signInWithGooglePopUp is UserCredential by Type Assertion

/* Approach 1
export default function checkIsUserCredentialType(
  result: UserCredential | void
): result is UserCredential {
  return (result as UserCredential).user !== undefined;
}

*/

/* Approach 2: Generics */
export default function checkIsUserCredentialType<
  T extends void | UserCredential
>(result: T): boolean {
  return (result as UserCredential).user !== undefined;
}
