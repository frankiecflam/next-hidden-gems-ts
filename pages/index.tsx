import type { NextPage } from "next";
import { Hero } from "../src/components/home";
import Head from "next/head";
import { useFirebaseAuthState } from "../src/hooks";
import { HomeMasonry } from "../src/components/home";

const Home: NextPage = () => {
  const [user, loading] = useFirebaseAuthState();

  if (loading) return null;

  return (
    <>
      <Head>
        <title>Hidden Gems — Home</title>
        <meta
          name="description"
          content="A social media platform where you discover hundreds of hidden gems from people all over the world."
        />
      </Head>
      <div>{user ? <HomeMasonry /> : <Hero />}</div>
    </>
  );
};

export default Home;
