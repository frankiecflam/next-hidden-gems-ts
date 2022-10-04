import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../config/firebase";

interface UploadImageFileToFirebaseStorage {
  path: "gems" | "gemmers";
  file: File;
}

export default async function uploadImageFileToFirebaseStorage({
  path,
  file,
}: UploadImageFileToFirebaseStorage) {
  const fileRef = ref(storage, `/images/${path}/${file.name}`);

  await uploadBytes(fileRef, file);
  const url = await getDownloadURL(fileRef);

  return url;
}
