import Gemmer from "../../types/gemmer";
import styles from "./GemmerProfileEditForm.module.css";
import Image from "next/image";
import { useInput, useFileReader } from "../../hooks";
import {
  validateUsernameInput,
  uploadImageFileToFirebaseStorage,
} from "../../utils/helpers";
import { FormEvent } from "react";
import { useUpdateGemmer } from "../../hooks";
import { query, where, collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";

interface GemmerProfileEditFormProps {
  onCloseEdit: () => void;
  gemmer: Gemmer;
}

const GemmerProfileEditForm = ({
  onCloseEdit,
  gemmer,
}: GemmerProfileEditFormProps) => {
  const {
    inputValue: usernameInputValue,
    inputIsValid: usernameInputValidity,
    onChange: usernameInputOnChange,
    onBlur: usernameInputOnBlur,
    onReset: usernameInputOnReset,
  } = useInput({
    initialValue: gemmer.username,
    inputValidate: validateUsernameInput,
  });

  const {
    inputValue: bioInputValue,
    inputIsValid: bioInputValidity,
    onChange: bioInputOnChange,
    onBlur: bioInputOnBlur,
    onReset: bioInputOnReset,
  } = useInput({
    initialValue: gemmer.bio,
    inputValidate: (inputValue: string) => true,
  });

  const {
    file: profileImageInputFile,
    fileDataUrl: profileImageInputPreviewUrl,
    onFileChange: profileImageInputOnChange,
    onFileReset: profileImageInputOnReset,
  } = useFileReader();

  const { mutate: mutateGemmer } = useUpdateGemmer();

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formValidity = usernameInputValidity && bioInputValidity;

    if (!formValidity) return;

    let updatedGemmerData: Gemmer = {
      ...gemmer,
      username: usernameInputValue,
      bio: bioInputValue,
    };

    if (profileImageInputFile) {
      const newProfileImageUrl = await uploadImageFileToFirebaseStorage({
        file: profileImageInputFile,
        path: "gemmers",
      });

      updatedGemmerData.image = newProfileImageUrl;
    }

    const q = query(collection(db, "gemmers"), where("id", "==", gemmer.id));

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log("Failed to update the gemmer's details!");
      return;
    }

    const docId = querySnapshot.docs[0].id;

    mutateGemmer({ mutatedGemmer: updatedGemmerData, docId });

    usernameInputOnReset();
    bioInputOnReset();
    onCloseEdit();
    profileImageInputOnReset();
  };

  return (
    <form className={styles.form} onSubmit={handleFormSubmit}>
      <div className={styles.imageContent}>
        <Image
          src={profileImageInputPreviewUrl || gemmer.image}
          alt=""
          layout="fixed"
          width={128}
          height={128}
          className={styles.gemmerImage}
        />
        <input
          type="file"
          className={styles.fileInput}
          accept="image/*"
          onChange={profileImageInputOnChange}
        />
      </div>
      <div className={styles.textContent}>
        <div>
          <input
            placeholder="username"
            value={usernameInputValue}
            onChange={usernameInputOnChange}
            onBlur={usernameInputOnBlur}
            minLength={2}
            required
          />
        </div>
        <div>
          <textarea
            placeholder="bio"
            cols={50}
            rows={10}
            value={bioInputValue}
            onChange={bioInputOnChange}
            onBlur={bioInputOnBlur}
          />
        </div>
        <button className={styles.submitBtn} type="submit">
          save
        </button>
      </div>
    </form>
  );
};

export default GemmerProfileEditForm;
