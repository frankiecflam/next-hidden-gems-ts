import { query, where, collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";

export default async function getDocumentIdByPrimaryKey(
  collectionName: "categories" | "gemmers" | "gems",
  primaryKey: string
) {
  const q = query(
    collection(db, collectionName),
    where("id", "==", primaryKey)
  );

  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    return;
  }

  return querySnapshot.docs[0].id;
}
