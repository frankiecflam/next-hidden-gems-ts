import type { NextPage } from "next";
import { useFirebaseAuthState } from "../../../src/hooks";
import { useRouter } from "next/router";
import Head from "next/head";
import { GemmerProfile } from "../../../src/components/gemmer";

const GemmerPage: NextPage = () => {
  const [user, isLoading] = useFirebaseAuthState();
  const router = useRouter();
  const queryId = router.query.id as string;

  /*This page is protected.*/
  if (!user && !isLoading) {
    router.push("/");
    return null;
  }

  return (
    <>
      <Head>
        <title>Hidden Gems — Gemmer Profile</title>
        <meta
          name="description"
          content="Gemmer's information and hidden gems."
        />
      </Head>
      <div>
        {user && <GemmerProfile queryId={queryId} loggedInUserId={user.uid} />}
      </div>
    </>
  );
};

export default GemmerPage;
