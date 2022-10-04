import styles from "./GemmerMasonryEmpty.module.css";

const GemmerMasonryEmpty = () => {
  return (
    <div className={styles.empty}>
      <h1 className={styles.heading}>No gems yet!</h1>
    </div>
  );
};

export default GemmerMasonryEmpty;
