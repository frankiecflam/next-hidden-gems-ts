// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { collection, getDocs, DocumentData, addDoc } from "firebase/firestore";
import { db } from "../../src/config/firebase";
import Gem from "../../src/types/gem";

type Data = {
  gems?: DocumentData[];
  error?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "GET") {
    try {
      const gemRef = collection(db, "gems");

      const querySnapshot = await getDocs(gemRef);

      if (querySnapshot.empty)
        throw new Error("No matching documents in gems collection");

      let docs: DocumentData[] = [];

      querySnapshot.forEach((doc) => {
        docs.push(doc.data());
      });

      return res.status(200).json({ gems: docs });
    } catch (error: any) {
      return res.status(400).json({ error });
    }
  }

  if (req.method === "POST") {
    const { newGem }: { newGem: Gem } = req.body;

    try {
      const gemsRef = collection(db, "gems");
      await addDoc(gemsRef, newGem);

      const querySnapshot = await getDocs(gemsRef);

      if (querySnapshot.empty)
        throw new Error("No matching documents in gems collection");

      let docs: DocumentData[] = [];

      querySnapshot.forEach((doc) => {
        docs.push(doc.data());
      });

      return res.status(200).json({ gems: docs });
    } catch (error: any) {
      return res.status(400).json({ error });
    }
  }

  return res
    .status(400)
    .json({ error: "Only GET and POST method are allowed!" });
}
