import { Timestamp } from "firebase/firestore";

export default function convertTimestampToDate(timestamp: Timestamp) {
  const milliseconds = timestamp.seconds * 1000;

  return new Date(milliseconds);
}
