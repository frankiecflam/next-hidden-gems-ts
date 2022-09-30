import { ReactNode } from "react";
import { Header } from "../header";
import { Main } from "../main";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      <Main>{children}</Main>
    </>
  );
};

export default Layout;
