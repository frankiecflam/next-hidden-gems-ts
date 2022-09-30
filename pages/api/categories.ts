// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { collection, getDocs, DocumentData } from "firebase/firestore";
import { db } from "../../src/config/firebase";

type Data = {
  categories?: DocumentData[];
  error?: string;
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

    let docs: DocumentData[] = [];

    querySnapshot.forEach((doc) => {
      docs.push(doc.data());
    });

    res.status(200).json({ categories: docs });
  } catch (error) {
    res.status(400).json({ error: "Failed to fetch data from the Firestore!" });
  }
}
