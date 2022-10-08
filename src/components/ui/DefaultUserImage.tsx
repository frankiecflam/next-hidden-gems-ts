import styles from "./DefaultUserImage.module.css";

interface DefaultUserImageProps {
  className?: string;
}

const DefaultUserImage = ({ className }: DefaultUserImageProps) => {
  return (
    <div
      className={
        className
          ? `${styles.defaultUserImage} ${className}`
          : styles.defaultUserImage
      }
    />
  );
};

export default DefaultUserImage;
