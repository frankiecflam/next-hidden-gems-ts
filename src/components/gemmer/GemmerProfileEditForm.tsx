import Gemmer from "../../types/gemmer";
import styles from "./GemmerProfileEditForm.module.css";
import Image from "next/image";
import { useInput, useFileReader } from "../../hooks";
import {
  validateUsernameInput,
  uploadImageFileToFirebaseCloudStorage,
} from "../../utils/helpers";
import { FormEvent } from "react";
import { useUpdateGemmer } from "../../hooks";
import { DefaultUserImage } from "../ui";
import { getDocumentIdByPrimaryKey } from "../../utils/helpers";

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
    state: {
      inputValue: gemmer.username,
      inputIsValid: true,
      inputIsTouched: false,
    },
    inputValidate: validateUsernameInput,
  });

  const {
    inputValue: bioInputValue,
    inputIsValid: bioInputValidity,
    onChange: bioInputOnChange,
    onBlur: bioInputOnBlur,
    onReset: bioInputOnReset,
  } = useInput({
    state: {
      inputValue: gemmer.bio,
      inputIsValid: true,
      inputIsTouched: false,
    },
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
      const newProfileImageUrl = await uploadImageFileToFirebaseCloudStorage({
        file: profileImageInputFile,
        path: "gemmers",
      });

      updatedGemmerData.image = newProfileImageUrl;
    }

    const docId = await getDocumentIdByPrimaryKey("gemmers", gemmer.id);

    if (!docId) {
      console.log("No matching document with the gemmer's Id provided!");
      return;
    }

    mutateGemmer({ mutatedGemmer: updatedGemmerData, docId });

    usernameInputOnReset();
    bioInputOnReset();
    onCloseEdit();
    profileImageInputOnReset();
  };

  return (
    <form className={styles.form} onSubmit={handleFormSubmit}>
      <div className={styles.imageContent}>
        {!profileImageInputPreviewUrl && !gemmer.image ? (
          <DefaultUserImage />
        ) : (
          <Image
            src={profileImageInputPreviewUrl || gemmer.image}
            alt=""
            layout="fixed"
            width={128}
            height={128}
            className={styles.gemmerImage}
          />
        )}

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
