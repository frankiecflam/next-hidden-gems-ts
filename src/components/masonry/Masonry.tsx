import styles from "./Masonry.module.css";
import { MasonryItem } from "./";
import Gem from "../../types/gem";
import Gemmer from "../../types/gemmer";

interface MasonryProps {
  gems: Gem[];
  gemmers: Gemmer[];
}

const Masonry = ({ gems, gemmers }: MasonryProps) => {
  return (
    <ul className={styles.masonry}>
      {gems.map((gem) => (
        <MasonryItem
          key={gem.id}
          gem={gem}
          gemmer={gemmers.find((gemmer) => gemmer.id === gem.gemmerId)!}
        />
      ))}
    </ul>
  );
};

export default Masonry;
