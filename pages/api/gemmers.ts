// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import {
  collection,
  getDocs,
  DocumentData,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../src/config/firebase";
import Gemmer from "../../src/types/gemmer";

type Data = {
  gemmers?: DocumentData[];
  error?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "GET") {
    try {
      const gemmerRef = collection(db, "gemmers");

      const querySnapshot = await getDocs(gemmerRef);

      if (querySnapshot.empty)
        throw new Error("No matching documents in gemmers collection");

      let docs: DocumentData[] = [];

      querySnapshot.forEach((doc) => {
        docs.push(doc.data());
      });

      return res.status(200).json({ gemmers: docs });
    } catch (error: any) {
      return res.status(500).json({ error });
    }
  }

  if (req.method === "PATCH") {
    const { gemmer, docId }: { gemmer: Gemmer; docId: string } = req.body;

    try {
      const docRef = doc(db, "/gemmers", docId);
      await updateDoc(docRef, { ...gemmer });

      const gemmerRef = collection(db, "gemmers");

      const querySnapshot = await getDocs(gemmerRef);

      if (querySnapshot.empty)
        throw new Error("Failed to get documents after update!");

      let docs: DocumentData[] = [];

      querySnapshot.forEach((doc) => {
        docs.push(doc.data());
      });

      return res.status(200).json({ gemmers: docs });
    } catch (error: any) {
      return res.status(500).json({ error });
    }
  }

  return res
    .status(400)
    .json({ error: "Only GET and PATCH method are allowed!" });
}
