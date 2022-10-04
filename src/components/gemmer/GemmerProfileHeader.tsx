import styles from "./GemmerProfileHeader.module.css";
import { GemmerInfo } from "./";
import Gemmer from "../../types/gemmer";

interface GemmerProfileHeaderProps {
  gemmer: Gemmer;
  currentUser: Gemmer;
}

const GemmerProfileHeader = ({
  gemmer,
  currentUser,
}: GemmerProfileHeaderProps) => {
  const isGemmertheCurrentUser = gemmer.id === currentUser.id;

  return (
    <header className={styles.header}>
      <GemmerInfo
        gemmer={gemmer}
        currentUser={currentUser}
        isGemmertheCurrentUser={isGemmertheCurrentUser}
      />
    </header>
  );
};

export default GemmerProfileHeader;

/* 
What we need for this component?


-- Do we need to determine if currentUser == gemmer?
- Yes, because edit button should be enabled to allow user updating its info
  - If they are not, followBtn and unfollowBtn should be conditionally rendered based on their following relationship

*/
