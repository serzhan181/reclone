import { ChangeEvent, useState } from "react";

export const useInputImg = () => {
  const [file, setFile] = useState<File | undefined>();
  const [fileUrl, setFileUrl] = useState("");

  const handlePreviewImg = (e: ChangeEvent<HTMLInputElement>) => {
    const url = URL.createObjectURL(e.target.files![0]);

    return url;
  };

  return { file, setFile, fileUrl, setFileUrl, handlePreviewImg };
};
