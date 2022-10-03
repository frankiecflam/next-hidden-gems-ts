import Gem from "../../types/gem";

export default function getGemWithCollectionId(
  collection: string[],
  gems: Gem[]
) {
  if (collection.length === 0) return [];

  const result = collection.map((collectionId) =>
    gems.find((gem) => gem.id === collectionId)
  );

  if (result.length === 0) return [];

  return result as Gem[];
}
