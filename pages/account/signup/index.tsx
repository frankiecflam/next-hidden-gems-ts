import type { NextPage } from "next";
import Head from "next/head";
import { useFirebaseAuthState } from "../../../src/hooks";
import { useRouter } from "next/router";
import { SignUpForm } from "../../../src/components/account/signup";

const SignUpPage: NextPage = () => {
  const [user, isLoading] = useFirebaseAuthState();
  const router = useRouter();

  if (isLoading) return null;

  if (user) {
    router.push("/");
  }
  return (
    <>
      <Head>
        <title>Hidden Gems — Sign Up</title>
        <meta
          name="description"
          content="Join now to discover hidden gems from people across the world!"
        />
      </Head>
      <>{!user && <SignUpForm />}</>
    </>
  );
};

export default SignUpPage;
