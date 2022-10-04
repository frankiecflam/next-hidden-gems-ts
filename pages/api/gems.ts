// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { collection, getDocs, DocumentData } from "firebase/firestore";
import { db } from "../../src/config/firebase";

type Data = {
  gems?: DocumentData[];
  error?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "GET")
    return res.status(400).json({ error: "Only GET method is allowed!" });

  try {
    const gemRef = collection(db, "gems");

    const querySnapshot = await getDocs(gemRef);

    if (querySnapshot.empty)
      throw new Error("No matching documents in gems collection");

    let docs: DocumentData[] = [];

    querySnapshot.forEach((doc) => {
      docs.push(doc.data());
    });

    res.status(200).json({ gems: docs });
  } catch (error: any) {
    res.status(400).json({ error });
  }
}