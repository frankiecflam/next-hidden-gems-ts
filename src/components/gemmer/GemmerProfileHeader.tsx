import styles from "./GemmerProfileHeader.module.css";
import { GemmerInfo } from "./";
import Gemmer from "../../types/gemmer";

interface GemmerProfileHeaderProps {
  gemmer: Gemmer;
  currentUser: Gemmer;
  onShowEdit: () => void;
}

const GemmerProfileHeader = ({
  gemmer,
  currentUser,
  onShowEdit,
}: GemmerProfileHeaderProps) => {
  const isGemmertheCurrentUser = gemmer.id === currentUser.id;

  return (
    <header className={styles.header}>
      <GemmerInfo
        gemmer={gemmer}
        currentUser={currentUser}
        isGemmertheCurrentUser={isGemmertheCurrentUser}
        onShowEdit={onShowEdit}
      />
    </header>
  );
};

export default GemmerProfileHeader;
