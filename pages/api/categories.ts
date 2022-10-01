// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
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

    if (!querySnapshot)
      throw new Error("Failed to fetch categories from the Firestore!");

    let docs: DocumentData[] = [];

    querySnapshot.forEach((doc) => {
      docs.push(doc.data());
    });

    res.status(200).json({ categories: docs });
  } catch (error: any) {
    res.status(500).json({ error });
  }
}
