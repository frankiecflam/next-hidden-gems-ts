import type { NextPage } from "next";
import Head from "next/head";
import { SignInForm } from "../../../src/components/account/signin";
import { useFirebaseAuthState } from "../../../src/hooks";
import { useRouter } from "next/router";

const SignInPage: NextPage = () => {
  const [user, isLoading] = useFirebaseAuthState();
  const router = useRouter();

  if (isLoading) return null;

  if (user) {
    router.push("/");
  }

  return (
    <>
      <Head>
        <title>Hidden Gems — Sign In</title>
        <meta
          name="description"
          content="Sign in now to discover hidden gems from people across the world!"
        />
      </Head>
      <div>{!user && <SignInForm />}</div>
    </>
  );
};

export default SignInPage;
