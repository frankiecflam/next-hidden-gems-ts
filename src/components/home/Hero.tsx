import styles from "./Hero.module.css";
import Image from "next/image";
import { HeroImage } from "../../assets/images";
import Link from "next/link";

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.textContent}>
        <h1 className={styles.heading}>
          discover <span className={styles.highlight}>hidden gems</span> from
          people all over the world
        </h1>
        <p className={styles.subHeading}>
          <span>To inspire</span>
          <span>Be inspired</span>
        </p>
        <Link href="/account/signin">
          <a className={styles.discoverLink}>discover</a>
        </Link>
      </div>
      <div className={styles.imageContent}>
        <Image
          src={HeroImage.src}
          alt=""
          layout="fill"
          className={styles.heroImage}
        />
      </div>
    </section>
  );
};

export default Hero;
