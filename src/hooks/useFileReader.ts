import { useState, useEffect, ChangeEvent } from "react";

const useFileReader = () => {
  const [file, setFile] = useState<File | null>(null);
  const [fileDataUrl, setFileDataUrl] = useState("");

  useEffect(() => {
    const fileReader = new FileReader();

    if (file) {
      fileReader.onloadend = () => {
        setFileDataUrl(fileReader.result as string);
      };
      fileReader.readAsDataURL(file);
    }
  }, [file]);

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const imageFile = e.target.files?.[0];

    if (imageFile) {
      setFile(imageFile);
      return;
    }
    console.log("Failed to get the fileData during onFileInputChange event!");
  };

  const handleFileInputReset = () => {
    setFile(null);
    setFileDataUrl("");
  };

  return {
    file,
    fileDataUrl,
    onFileChange: handleFileInputChange,
    onFileReset: handleFileInputReset,
  };
};

export default useFileReader;
