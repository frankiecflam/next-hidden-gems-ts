import type { NextPage } from "next";
import Head from "next/head";
import { CollectionMasonry } from "../../src/components/collection";
import { useFirebaseAuthState } from "../../src/hooks";
import { useRouter } from "next/router";

const CollectionPage: NextPage = () => {
  const [user, isLoading] = useFirebaseAuthState();
  const router = useRouter();

  /*This page is protected.*/
  if (!user && !isLoading) {
    router.push("/");
    return null;
  }

  return (
    <>
      <Head>
        <title>Hidden Gems — Collection</title>
        <meta
          name="description"
          content="Collection of all the hidden gems you have saved along."
        />
      </Head>
      <div>{user && <CollectionMasonry loggedInUserId={user.uid} />}</div>
    </>
  );
};

export default CollectionPage;
