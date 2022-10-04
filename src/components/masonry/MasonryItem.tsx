import styles from "./MasonryItem.module.css";
import Image from "next/image";
import GemType from "../../types/gem";
import GemmerType from "../../types/gemmer";
import { useState } from "react";
import { Gem } from "../gem";
import { CollectionFilledIcon } from "../../assets/icons";
import { checkCollectionForGem } from "../../utils/helpers";
import { query, where, collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useUpdateGemmer } from "../../hooks";

interface MasonryItemProps {
  gem: GemType;
  gemmer: GemmerType;
  currentUser: GemmerType;
}

const MasonryItem = ({ gem, gemmer, currentUser }: MasonryItemProps) => {
  const [showGemModal, setShowGemModal] = useState(false);

  const isGemInCollection = checkCollectionForGem(
    currentUser.collection,
    gem.id
  );
  const { mutate: mutateCurrentUser } = useUpdateGemmer();

  const handleUpdateCollection = async () => {
    const q = query(
      collection(db, "gemmers"),
      where("id", "==", currentUser.id)
    );

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log("Failed to update collection!");
      return;
    }

    const docId = querySnapshot.docs[0].id;
    const updatedUserInfo: GemmerType = {
      ...currentUser,
      collection: isGemInCollection
        ? currentUser.collection.filter((gemId) => gemId !== gem.id)
        : [...currentUser.collection, gem.id],
    };

    mutateCurrentUser({ mutatedGemmer: updatedUserInfo, docId });
  };

  return (
    <>
      <li className={styles.masonryItem}>
        <Image
          src={gem.image}
          alt=""
          layout="responsive"
          width={320}
          height={480}
          onClick={() => setShowGemModal(true)}
          className={styles.gemImage}
        />
        <CollectionFilledIcon
          onClick={handleUpdateCollection}
          className={
            isGemInCollection
              ? `${styles.collectionIcon} ${styles.filled}`
              : styles.collectionIcon
          }
        />
        <p className={styles.gemmerName}>@{gemmer.username}</p>
      </li>
      {showGemModal && (
        <Gem
          gem={gem}
          gemmer={gemmer}
          onCloseModal={() => setShowGemModal(false)}
        />
      )}
    </>
  );
};

export default MasonryItem;
