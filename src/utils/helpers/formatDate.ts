import { Timestamp } from "firebase/firestore";

export default function formatDate(date: Date | Timestamp) {
  const locale = navigator.language;

  let dateObj: Date;

  if (date instanceof Date) {
    dateObj = date;
  } else {
    const milliseconds = date.seconds * 1000;

    dateObj = new Date(milliseconds);
  }

  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(dateObj);
}
