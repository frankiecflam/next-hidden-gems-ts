import { Timestamp } from "firebase/firestore";

export default interface Gemmer {
  id: string;
  username: string;
  bio: string;
  image: string;
  joinningDate: Timestamp;
  collection: string[];
  following: string[];
  followers: string[];
}
