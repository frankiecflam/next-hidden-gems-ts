import styles from "./GemmerInfo.module.css";
import Gemmer from "../../types/gemmer";
import Image from "next/image";
import { useState } from "react";
import { GemmerRelationship, GemmerRelationshipUpdateBtn } from "./";
import { useUpdateGemmer } from "../../hooks";
import { query, where, collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";

interface GemmerInfoProps {
  gemmer: Gemmer;
  currentUser: Gemmer;
  isGemmertheCurrentUser: boolean;
}

const GemmerInfo = ({
  gemmer,
  currentUser,
  isGemmertheCurrentUser,
}: GemmerInfoProps) => {
  const [showFollowingModal, setShowFollowingModal] = useState(false);
  const [showFollowersModal, setShowFollowersModal] = useState(false);

  const { mutate: mutateGemmer } = useUpdateGemmer();

  const isCurrentUserAFollower = currentUser.following.find(
    (followingId) => followingId === gemmer.id
  )
    ? true
    : false;

  const handleGemmerRelationshipUpdate = async () => {
    const q = query(
      collection(db, "gemmers"),
      where("id", "in", [gemmer.id, currentUser.id])
    );

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log(
        "Failed to update the relationship between the gemmer and the current user!"
      );
      return;
    }

    let gemmerDocId: string = "";
    let currentUserDocID: string = "";

    querySnapshot.forEach((doc) => {
      const docData = doc.data();
      if (docData.id === gemmer.id) {
        gemmerDocId = doc.id;
      }

      if (docData.id === currentUser.id) {
        currentUserDocID = doc.id;
      }
    });

    if (!gemmerDocId) {
      console.log("Failed to get the document Id of gemmer!");
      return;
    }

    if (!currentUserDocID) {
      console.log("Failed to get the document Id of the current user!");
      return;
    }

    let updatedGemmerData: Gemmer;
    let updatedCurrentUserData: Gemmer;

    if (isCurrentUserAFollower) {
      updatedGemmerData = {
        ...gemmer,
        followers: gemmer.followers.filter(
          (followerId) => followerId !== currentUser.id
        ),
      };

      updatedCurrentUserData = {
        ...currentUser,
        following: currentUser.following.filter(
          (followingId) => followingId !== gemmer.id
        ),
      };
    } else {
      updatedGemmerData = {
        ...gemmer,
        followers: [...gemmer.followers, currentUser.id],
      };

      updatedCurrentUserData = {
        ...currentUser,
        following: [...currentUser.following, gemmer.id],
      };
    }

    mutateGemmer({ mutatedGemmer: updatedGemmerData, docId: gemmerDocId });
    mutateGemmer({
      mutatedGemmer: updatedCurrentUserData,
      docId: currentUserDocID,
    });
  };

  return (
    <div className={styles.gemmerInfo}>
      <div className={styles.gemmerImageContainer}>
        <Image
          src={gemmer.image}
          alt=""
          layout="fixed"
          width={128}
          height={128}
          className={styles.gemmerImage}
        />
      </div>
      <div className={styles.gemmerDetails}>
        <div className={styles.gemmerInfoFlex}>
          <p className={styles.gemmerUsername}>{gemmer.username}</p>
          {!isGemmertheCurrentUser ? (
            isCurrentUserAFollower ? (
              <GemmerRelationshipUpdateBtn
                onClick={handleGemmerRelationshipUpdate}
                className={styles.unfollowBtn}
              >
                unfollow
              </GemmerRelationshipUpdateBtn>
            ) : (
              <GemmerRelationshipUpdateBtn
                onClick={handleGemmerRelationshipUpdate}
                className={styles.followBtn}
              >
                follow
              </GemmerRelationshipUpdateBtn>
            )
          ) : (
            <GemmerRelationshipUpdateBtn
              onClick={() => {}}
              className={styles.editBtn}
            >
              edit
            </GemmerRelationshipUpdateBtn>
          )}
        </div>
        <div className={styles.gemmerInfoFlex}>
          <p>
            <span className={styles.gemmerInfoNum}>{gemmer.gems.length}</span>{" "}
            gems
          </p>

          <p
            className={styles.followers}
            onClick={() => setShowFollowersModal(true)}
          >
            <span className={styles.gemmerInfoNum}>
              {gemmer.followers.length}
            </span>{" "}
            followers
          </p>

          {showFollowersModal && (
            <GemmerRelationship
              onCloseModal={() => setShowFollowersModal(false)}
              gemmer={gemmer}
              view="Followers"
            />
          )}

          <p
            className={styles.following}
            onClick={() => setShowFollowingModal(true)}
          >
            <span className={styles.gemmerInfoNum}>
              {gemmer.following.length}
            </span>{" "}
            following
          </p>
          {showFollowingModal && (
            <GemmerRelationship
              onCloseModal={() => setShowFollowingModal(false)}
              gemmer={gemmer}
              view="Following"
            />
          )}
        </div>
        <div>
          <p>{gemmer.bio}</p>
        </div>
      </div>
    </div>
  );
};

export default GemmerInfo;
