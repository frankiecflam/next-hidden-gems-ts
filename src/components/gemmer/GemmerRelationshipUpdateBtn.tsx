import { ReactNode } from "react";
import styles from "./GemmerRelationshipUpdateBtn.module.css";

interface GemmerRelationshipUpdateBtnProps {
  children: ReactNode;
  className?: string;
  onClick: () => void;
}

const GemmerRelationshipUpdateBtn = ({
  children,
  className,
  onClick,
}: GemmerRelationshipUpdateBtnProps) => {
  return (
    <button
      className={className ? `${styles.btn} ${className}` : styles.btn}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default GemmerRelationshipUpdateBtn;
