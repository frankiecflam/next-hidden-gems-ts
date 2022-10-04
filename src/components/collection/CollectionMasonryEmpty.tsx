import styles from "./CollectionMasonryEmpty.module.css";

const CollectionMasonryEmpty = () => {
  return (
    <div className={styles.empty}>
      <h1 className={styles.heading}>Your collection is currently empty!</h1>
    </div>
  );
};

export default CollectionMasonryEmpty;
