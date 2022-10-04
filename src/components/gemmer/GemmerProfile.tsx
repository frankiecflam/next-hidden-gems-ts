import styles from "./GemmerProfile.module.css";
import { useGemmer } from "../../hooks";
import { GemmerNotFound, GemmerProfileHeader, GemmerMasonry } from "./";

const GemmerProfile = ({
  queryId,
  loggedInUserId,
}: {
  queryId: string;
  loggedInUserId: string;
}) => {
  const {
    isLoading: gemmerIsLoading,
    error: gemmerLoadingError,
    data: gemmer,
  } = useGemmer(queryId);

  const {
    isLoading: currentUserIsLoading,
    error: currentUserLoadingError,
    data: currentUser,
  } = useGemmer(loggedInUserId);

  if (gemmerIsLoading || currentUserIsLoading) return null;

  if (gemmerLoadingError || !gemmer)
    return (
      <div>
        Something went wrong fetching data of the gememr whose id is {queryId}!
      </div>
    );

  if (currentUserLoadingError || !currentUser) {
    return (
      <div>
        Something went wrong fetching the data of currently-logged-in user!
      </div>
    );
  }

  return (
    <section className={styles.gemmerProfile}>
      {!gemmer ? (
        <GemmerNotFound queryId={queryId} />
      ) : (
        <>
          <GemmerProfileHeader gemmer={gemmer} currentUser={currentUser} />
          <GemmerMasonry currentUser={currentUser} gemmer={gemmer} />
        </>
      )}
    </section>
  );
};

export default GemmerProfile;
