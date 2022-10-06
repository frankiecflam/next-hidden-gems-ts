import { NewGemFormHeader } from "./";
import styles from "./NewGemForm.module.css";
import { ChangeEvent, useState, FormEvent } from "react";
import Image from "next/image";
import {
  useFileReader,
  useInput,
  useCategories,
  useCreateGem,
  useUpdateGemmer,
} from "../../hooks";
import { uploadImageFileToFirebaseStorage } from "../../utils/helpers";
import Gem from "../../types/gem";
import { v4 as uuidv4 } from "uuid";
import { db } from "../../config/firebase";
import Gemmer from "../../types/gemmer";
import { useRouter } from "next/router";

import {
  query,
  where,
  collection,
  getDocs,
  Timestamp,
} from "firebase/firestore";

const NewGemForm = ({ loggedInUserId }: { loggedInUserId: string }) => {
  const [categoryInputValue, setCategoryInputValue] = useState("default");
  const [formFeedback, setFormFeedback] = useState("");
  const router = useRouter();

  const {
    file: gemImageFile,
    fileDataUrl: gemImagePreviewUrl,
    onFileChange: gemImageFileInputOnChange,
    onFileReset: gemImageFileInputOnReset,
  } = useFileReader();

  const {
    inputValue: titleInputValue,
    inputIsValid: titleInputValidity,
    onChange: titleInputOnChange,
    onBlur: titleInputOnBlur,
    onReset: titleInputOnReset,
  } = useInput({
    initialValue: "",
    inputValidate: (inputValue: string) => inputValue.trim().length > 0,
  });

  const {
    inputValue: descriptionInputValue,
    inputIsValid: descriptionInputValidity,
    onChange: descriptionInputOnChange,
    onBlur: descriptionInputOnBlur,
    onReset: descriptionInputOnReset,
  } = useInput({
    initialValue: "",
    inputValidate: (inputValue: string) => inputValue.trim().length > 0,
  });

  const {
    isLoading: categoryIsLoading,
    error: categoryLoadingError,
    data: categories,
  } = useCategories();

  const { mutate: createNewGem } = useCreateGem();
  const { mutate: updateGemmer } = useUpdateGemmer();

  if (categoryIsLoading) return null;

  if (categoryLoadingError || !categories)
    return (
      <div>Something went wrong fetching categories from the database!</div>
    );

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formValidity: boolean = gemImageFile
      ? true
      : false && categoryInputValue
      ? true
      : false && titleInputValidity && descriptionInputValidity;

    if (!formValidity) {
      setFormFeedback(
        "Sorry! All input fields are required to create your new gem."
      );
      return;
    }

    if (!gemImageFile) {
      console.log("Something went wrong reading the data of the gem image!");
      return;
    }

    const fileImageFirebaseStorageUrl = await uploadImageFileToFirebaseStorage({
      path: "gems",
      file: gemImageFile,
    });

    const newGemId = uuidv4();

    const newGem: Gem = {
      id: newGemId,
      title: titleInputValue,
      description: descriptionInputValue,
      image: fileImageFirebaseStorageUrl,
      categoryId: categoryInputValue,
      gemmerId: loggedInUserId,
      date: Timestamp.now(),
    };

    const q = query(
      collection(db, "gemmers"),
      where("id", "==", loggedInUserId)
    );

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log("Failed to update collection!");
      return;
    }

    const docId = querySnapshot.docs[0].id;
    const gemmerData = querySnapshot.docs[0].data() as Gemmer;

    createNewGem(newGem);
    updateGemmer({
      mutatedGemmer: { ...gemmerData, gems: [...gemmerData.gems, newGemId] },
      docId,
    });

    titleInputOnReset();
    descriptionInputOnReset();
    setCategoryInputValue("default");
    gemImageFileInputOnReset();

    setFormFeedback("Your new gem has been created successfully!");

    setTimeout(() => {
      setFormFeedback("");
      router.push("/");
    }, 2000);
  };

  return (
    <form className={styles.form} onSubmit={handleFormSubmit}>
      <NewGemFormHeader />
      <div className={styles.body}>
        <div className={styles.fileInputContainer}>
          {gemImagePreviewUrl && (
            <Image
              src={gemImagePreviewUrl}
              alt=""
              layout="fill"
              className={styles.fileInputPreview}
            />
          )}
          <input
            type="file"
            accept="image/*"
            required
            className={styles.fileInput}
            onChange={gemImageFileInputOnChange}
          />
        </div>
        <input
          type="text"
          placeholder="title"
          required
          minLength={1}
          value={titleInputValue}
          onChange={titleInputOnChange}
          onBlur={titleInputOnBlur}
        />
        <textarea
          cols={50}
          rows={10}
          placeholder="write a description..."
          minLength={1}
          value={descriptionInputValue}
          onChange={descriptionInputOnChange}
          onBlur={descriptionInputOnBlur}
          required
        />
        <select
          required
          value={categoryInputValue}
          className={styles.categorySelect}
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            setCategoryInputValue(e.target.value)
          }
        >
          <option value="default" disabled>
            Please select a category
          </option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <button className={styles.btn} type="submit">
          create
        </button>
        {formFeedback && <p className={styles.formFeedback}>{formFeedback}</p>}
      </div>
    </form>
  );
};

export default NewGemForm;
