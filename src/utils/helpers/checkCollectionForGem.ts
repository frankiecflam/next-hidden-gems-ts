export default function checkCollectionForGem(
  collection: string[],
  gemId: string
) {
  return collection.find((collectionId) => collectionId === gemId)
    ? true
    : false;
}
