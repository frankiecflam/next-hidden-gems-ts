import { Timestamp } from "firebase/firestore";
import Gem from "./gem";

export default interface Gemmer {
  id: string;
  username: string;
  email: string;
  bio: string;
  image: string;
  joiningDate: Timestamp;
  collection: string[];
  following: string[];
  followers: string[];
  gems: string[];
}
