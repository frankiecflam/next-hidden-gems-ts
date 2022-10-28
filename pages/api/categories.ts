import type { NextApiRequest, NextApiResponse } from "next";
import { collection, getDocs, DocumentData } from "firebase/firestore";
import { db } from "../../src/config/firebase";

type Data = {
  categories?: DocumentData[];
  error?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "GET")
    return res.status(400).json({ error: "Only GET method is allowed!" });

  try {
    const categoryRef = collection(db, "categories");

    const querySnapshot = await getDocs(categoryRef);

    if (querySnapshot.empty)
      throw new Error("No matching documents in categories collection");

    let docs: DocumentData[] = [];

    querySnapshot.forEach((doc) => {
      docs.push(doc.data());
    });

    return res.status(200).json({ categories: docs });
  } catch (error: any) {
    if (error instanceof Error) {
      console.log(error);
      return res.status(400).json({ error: error.message });
    }

    return res.status(500).json({
      error:
        "Failed to fetch documents of the categories collection from the database!",
    });
  }
}
