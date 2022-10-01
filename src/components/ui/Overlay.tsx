import styles from "./Overlay.module.css";

const Overlay = ({ onClick }: { onClick?: () => void }) => {
  return <div className={styles.overlay} onClick={onClick} />;
};

export default Overlay;
