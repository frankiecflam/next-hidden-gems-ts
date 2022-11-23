import Gemmer from "../../types/gemmer";
import styles from "./GemmerRelationshipModal.module.css";
import { useGemmers } from "../../hooks";
import Image from "next/image";
import Link from "next/link";
import { DefaultUserImage } from "../ui";
import { BlurImage } from "../../assets/images";

interface GemmerRelationshipModalProps {
  onCloseModal: () => void;
  gemmer: Gemmer;
  view: "Followers" | "Following";
}

const GemmerRelationshipModal = ({
  onCloseModal,
  gemmer,
  view,
}: GemmerRelationshipModalProps) => {
  const {
    isLoading: gemmersIsLoading,
    error: gemmersLoadingError,
    data: gemmers,
  } = useGemmers();

  if (gemmersIsLoading) return null;

  if (gemmersLoadingError || !gemmers)
    return <div>Something went wrong fetching gemmers from the database!</div>;

  const isGemmerListEmpty =
    view === "Followers"
      ? gemmer.followers.length === 0
      : gemmer.following.length === 0;

  const gemmerList =
    view === "Followers"
      ? (gemmer.followers.map((followerId) =>
          gemmers.find((gemmer) => gemmer.id === followerId)
        ) as Gemmer[])
      : (gemmer.following.map((followingId) =>
          gemmers.find((gemmer) => gemmer.id === followingId)
        ) as Gemmer[]);

  return (
    <div className={styles.modal}>
      <header className={styles.header}>
        <h1 className={styles.heading}>{view}</h1>
      </header>
      {isGemmerListEmpty ? (
        <p className={styles.noGemmers}>
          There are no gemmers currently in the list!
        </p>
      ) : (
        <ul className={styles.gemmerList}>
          {gemmerList.map((gemmer) => (
            <li key={gemmer.id} className={styles.gemmerItem}>
              <div onClick={onCloseModal}>
                <Link href={`/gemmer/${gemmer.id}`}>
                  <a className={styles.gemmerImageLink}>
                    {gemmer.image ? (
                      <Image
                        src={gemmer.image}
                        alt=""
                        layout="fixed"
                        width={50}
                        height={50}
                        className={styles.gemmerImage}
                        placeholder="blur"
                        blurDataURL={BlurImage.src}
                      />
                    ) : (
                      <DefaultUserImage className={styles.noGemmerImage} />
                    )}
                  </a>
                </Link>
              </div>
              <div onClick={onCloseModal}>
                <Link href={`/gemmer/${gemmer.id}`}>
                  <a>
                    <p className={styles.gemmerUsername}>{gemmer.username}</p>
                  </a>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GemmerRelationshipModal;
