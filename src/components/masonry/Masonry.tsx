import styles from "./Masonry.module.css";
import { MasonryItem } from "./";
import Gem from "../../types/gem";
import Gemmer from "../../types/gemmer";

interface MasonryProps {
  gems: Gem[];
  gemmers: Gemmer[];
  currentUser: Gemmer;
}

const Masonry = ({ gems, gemmers, currentUser }: MasonryProps) => {
  return (
    <ul className={styles.masonry}>
      {gems.map((gem) => (
        <MasonryItem
          key={gem.id}
          gem={gem}
          gemmer={gemmers.find((gemmer) => gemmer.id === gem.gemmerId)!}
          currentUser={currentUser}
        />
      ))}
    </ul>
  );
};

export default Masonry;
