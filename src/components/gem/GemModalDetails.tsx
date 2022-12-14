import Gem from "../../types/gem";
import Image from "next/image";
import Link from "next/link";
import styles from "./GemModalDetails.module.css";
import { formatDate } from "../../utils/helpers";
import { DefaultUserImage } from "../ui";
import { BlurImage } from "../../assets/images";

interface GemModalDetailsProps {
  gem: Gem;
  gemmerId: string;
  gemmerUsername: string;
  gemmerImage: string;
}

const GemModalDetails = ({
  gem,
  gemmerId,
  gemmerImage,
  gemmerUsername,
}: GemModalDetailsProps) => {
  return (
    <div>
      <header className={styles.header}>
        <Link href={`/gemmer/${gemmerId}`}>
          <a className={styles.gemmerImageLink}>
            {gemmerImage ? (
              <Image
                src={gemmerImage}
                alt=""
                layout="fixed"
                width={50}
                height={50}
                className={styles.gemmerImage}
                placeholder="blur"
                blurDataURL={BlurImage.src}
              />
            ) : (
              <DefaultUserImage className={styles.noGemmerImage} />
            )}
          </a>
        </Link>
        <Link href={`/gemmer/${gemmerId}`}>
          <p className={styles.gemmerUsername}>{gemmerUsername}</p>
        </Link>
      </header>
      <div className={styles.body}>
        <p className={styles.gemDate}>{formatDate(gem.date)}</p>
        <p className={styles.gemTitle}>{gem.title}</p>
        <p className={styles.gemDescription}>{gem.description}</p>
      </div>
    </div>
  );
};

export default GemModalDetails;
