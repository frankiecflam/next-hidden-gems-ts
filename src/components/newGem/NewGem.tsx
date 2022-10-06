import { NewGemForm } from "./";
import styles from "./NewGem.module.css";

const NewGem = ({ loggedInUserId }: { loggedInUserId: string }) => {
  return (
    <section className={styles.newGem}>
      <NewGemForm loggedInUserId={loggedInUserId} />
    </section>
  );
};

export default NewGem;
