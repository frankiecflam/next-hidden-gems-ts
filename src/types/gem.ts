import { Timestamp } from "firebase/firestore";

export default interface Gem {
  id: string;
  title: string;
  description: string;
  image: string;
  date: Timestamp;
  categoryId: string;
  gemmerId: string;
}
