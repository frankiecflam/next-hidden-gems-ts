import { ReactNode } from "react";
import styles from "./Main.module.css";
import { Container } from "../ui";

const Main = ({ children }: { children: ReactNode }) => {
  return (
    <main className={styles.main}>
      <div id="overlay-root" />
      <div id="modal-root" />
      <Container>{children}</Container>
    </main>
  );
};

export default Main;
