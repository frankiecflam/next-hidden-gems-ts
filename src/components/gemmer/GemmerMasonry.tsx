import styles from "./GemmerMasonry.module.css";
import { useGems } from "../../hooks";
import { Masonry } from "../masonry";
import { getGemsWithIds } from "../../utils/helpers";
import { GemmerMasonryEmpty } from "./";
import Gemmer from "../../types/gemmer";

const GemmerMasonry = ({
  gemmer,
  currentUser,
}: {
  gemmer: Gemmer;
  currentUser: Gemmer;
}) => {
  const {
    isLoading: gemsIsLoading,
    error: gemsLoadingError,
    data: gems,
  } = useGems();

  if (gemsIsLoading) return null;

  if (gemsLoadingError || !gems)
    return <div>Something went wrong fetching gems from the database!</div>;

  const gemmerCreation = getGemsWithIds(gemmer.gems, gems);

  return (
    <section className={styles.masonry}>
      {gemmerCreation.length === 0 ? (
        <GemmerMasonryEmpty />
      ) : (
        <Masonry
          gemmers={[gemmer]}
          currentUser={currentUser}
          gems={gemmerCreation}
        />
      )}
    </section>
  );
};

export default GemmerMasonry;

/* 
Header - gemmer details

Body - Masonry
 - gems should be the gems whose gemmerId is queryId
 - gemmers - everyone
 - currentUser - currently-logged-in user

*/
