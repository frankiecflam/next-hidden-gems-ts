import type { NextPage } from "next";
import Head from "next/head";
import { CollectionMasonry } from "../../src/components/collection";

const CollectionPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Hidden Gems — Collection</title>
        <meta
          name="description"
          content="Collection of all the hidden gems you have saved along."
        />
      </Head>
      <div>
        <CollectionMasonry />
      </div>
    </>
  );
};

export default CollectionPage;

/*
This page is protected. NEED authentication either on SSR or client side.
*/
