import Gem from "../../types/gem";

export default function filterGemsBySearchTerm(gems: Gem[], searchTerm: string) {
  if (!searchTerm) return gems;

  return gems.filter((gem) => gem.title.toLowerCase().includes(searchTerm.toLowerCase()));
}
