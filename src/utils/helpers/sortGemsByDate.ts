import Gem from "../../types/gem";

export default function sortGemsByDate(gems: Gem[]) {
  return gems.sort((a, b) => {
    const aDate = a.date;
    const bDate = b.date;

    if (aDate.seconds > bDate.seconds) {
      return -1;
    }

    if (aDate.seconds < bDate.seconds) {
      return 1;
    }

    return 0;
  });
}
