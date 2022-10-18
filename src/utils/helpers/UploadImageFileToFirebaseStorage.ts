import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../config/firebase";

interface UploadImageFileToFirebaseStorageArgs {
  path: "gems" | "gemmers";
  file: File;
}

async function uploadImageFileToFirebaseStorage({
  path,
  file,
}: UploadImageFileToFirebaseStorageArgs) {
  const fileRef = ref(storage, `/images/${path}/${file.name}`);

  await uploadBytes(fileRef, file);
  const url = await getDownloadURL(fileRef);

  return url;
}

export default uploadImageFileToFirebaseStorage;
