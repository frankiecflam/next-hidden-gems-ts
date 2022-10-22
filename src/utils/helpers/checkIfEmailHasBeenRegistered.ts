import { query, where, collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";

export default async function checkIfEmailHasBeenRegistered(
  email: string
): Promise<boolean> {
  const q = query(collection(db, "gemmers"), where("email", "==", email));

  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    return false;
  }

  return true;
}
