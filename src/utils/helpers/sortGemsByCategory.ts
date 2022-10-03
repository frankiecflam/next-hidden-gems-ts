import Gem from "../../types/gem";

export default function sortGemsByCategory(gems: Gem[]) {
  return gems.sort((a, b) => {
    const aCategory = a.categoryId;
    const bCategory = b.categoryId;

    if (aCategory > bCategory) {
      return 1;
    }

    if (aCategory < bCategory) {
      return -1;
    }

    return 0;
  });
}
