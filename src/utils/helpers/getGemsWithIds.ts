import Gem from "../../types/gem";

export default function getGemsWithIds(ids: string[], gems: Gem[]) {
  if (ids.length === 0) return [];

  const result = ids.map((id) => gems.find((gem) => gem.id === id));

  if (result.length === 0) return [];

  return result as Gem[];
}
