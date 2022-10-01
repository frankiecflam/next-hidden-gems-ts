import Gem from "../../types/gem";

export default function filterGemsByCategory(gems: Gem[], categoryId: string) {
  if (!categoryId) return gems;

  return gems.filter((gem) => gem.categoryId == categoryId);
}
