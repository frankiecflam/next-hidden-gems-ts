import type { NextPage } from "next";
import Head from "next/head";
import { NewGem } from "../../src/components/newGem";
import { useFirebaseAuthState } from "../../src/hooks";
import { useRouter } from "next/router";

const NewGemPage: NextPage = () => {
  const [user, loading] = useFirebaseAuthState();
  const router = useRouter();

  if (loading) return null;

  /*This page is protected.*/
  if (!user && !loading) {
    router.push("/");
    return null;
  }

  return (
    <>
      <Head>
        <title>Hidden Gems — New Gem</title>
        <meta
          name="description"
          content="Share a new hidden gem that surprises people."
        />
      </Head>
      {user && (
        <div>
          <NewGem loggedInUserId={user.uid} />
        </div>
      )}
    </>
  );
};

export default NewGemPage;
