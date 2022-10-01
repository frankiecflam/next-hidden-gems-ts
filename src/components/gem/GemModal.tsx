import styles from "./GemModal.module.css";
import Gem from "../../types/gem";
import Gemmer from "../../types/gemmer";
import Image from "next/image";
import { GemModalDetails } from "./";

interface GemModalProps {
  onCloseModal: () => void;
  gem: Gem;
  gemmer: Gemmer;
}

const GemModal = ({ onCloseModal, gem, gemmer }: GemModalProps) => {
  return (
    <div className={styles.modal} onClick={onCloseModal}>
      <div className={styles.imageContent}>
        <Image src={gem.image} alt="" layout="fill" objectFit="cover" />
      </div>
      <GemModalDetails
        gem={gem}
        gemmerId={gemmer.id}
        gemmerImage={gemmer.image}
        gemmerUsername={gemmer.username}
      />
    </div>
  );
};

export default GemModal;
