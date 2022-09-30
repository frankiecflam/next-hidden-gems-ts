import styles from "./Hero.module.css";
import Image from "next/image";
import { HeroImage } from "../../assets/images";
import { signInWithGooglePopup } from "../../config/firebase";
import { useRouter } from "next/router";

const Hero = () => {
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await signInWithGooglePopup();

      if (!response.user) throw new Error("Failed to sign in!");

      router.push("/");
    } catch (error: any) {
      console.log(error.message);
    }
  };

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
        <button className={styles.discoverBtn} onClick={handleLogin}>
          discover
        </button>
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
