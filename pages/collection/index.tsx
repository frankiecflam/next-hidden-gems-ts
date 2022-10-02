import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import { useFirebaseAuthState } from "../../src/hooks";

const Collection: NextPage = () => {
  return <div>Collection Page</div>;
};

export default Collection;

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {},
  };
};
