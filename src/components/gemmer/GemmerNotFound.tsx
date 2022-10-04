import styles from "./GemmerNotFound.module.css";

const GemmerNotFound = ({ queryId }: { queryId: string }) => {
  return (
    <div className={styles.notFound}>
      <h1 className={styles.heading}>
        Sorry! No gemmer whose id is
        <span className={styles.queryId}>{queryId}</span> has been found!
      </h1>
    </div>
  );
};

export default GemmerNotFound;
