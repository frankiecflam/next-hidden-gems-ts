import styles from "./CollectionEmpty.module.css";

const CollectionEmpty = () => {
  return (
    <div className={styles.empty}>
      <h1 className={styles.heading}>Your collection is currently empty!</h1>
    </div>
  );
};

export default CollectionEmpty;
