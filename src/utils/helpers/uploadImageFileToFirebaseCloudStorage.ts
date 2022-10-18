import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../config/firebase";

interface UploadImageFileToFirebaseStorageArgs {
  path: "gems" | "gemmers";
  file: File;
}

export default async function uploadImageFileToFirebaseCloudStorage({
  path,
  file,
}: UploadImageFileToFirebaseStorageArgs) {
  const fileRef = ref(storage, `/images/${path}/${file.name}`);

  await uploadBytes(fileRef, file);
  const url = await getDownloadURL(fileRef);

  return url;
}
