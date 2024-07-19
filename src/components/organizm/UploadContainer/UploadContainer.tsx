import React, { useEffect, useState } from "react";

import { deleteFile, getFiles, sendFiles } from "@/api";
import { Button, ImagesDrop, ShowImages } from "@/components";
import { concatenateFormData, removeByIndex } from "@/utils";
import { useDispatch, useSelector } from "react-redux";
import { StoreI } from "@/store/types";
import { currentPhotosActions } from "@/store";
import "./UploadContainer.scss";

interface UploadContainerI {
  url: string;
  title: string;
}

export const UploadContainer = ({ url, title }: UploadContainerI) => {
  const dispatch = useDispatch();
  const [images, setImages] = useState<string[]>([]);
  const [formData, setFormData] = useState(new FormData());
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const uploadedImages = useSelector(
    (state: StoreI) => state.currentPhotos.photos
  );

  const handleLoadImages = async () => {
    const resImages = await getFiles(url);
    dispatch(currentPhotosActions.setPhotos(resImages));
  };

  const handleDropImages = (form: FormData) => {
    const urls: string[] = [];
    for (const value of form.values()) {
      if (value instanceof Blob) {
        urls.push(URL.createObjectURL(value));
      }
    }
    setFormData(concatenateFormData(formData, form));
    setImages([...images, ...urls]);
  };

  const handleRemoveLocalImage = (idx: string) => {
    const tempImages = [...images];
    tempImages.splice(+idx, 1);
    setImages(tempImages);

    const newForm = removeByIndex(formData, +idx);
    setFormData(newForm);
  };

  const handleSendImages = async () => {
    setButtonDisabled(true);
    await sendFiles(formData, url);
    setFormData(new FormData());
    setImages([]);
    setTimeout(
      async () => dispatch(currentPhotosActions.setPhotos(await getFiles(url))),
      1000
    );
    setButtonDisabled(false);
  };
  const handleRemoveImageFromServer = async (id: string) => {
    dispatch(currentPhotosActions.setPhotos(await deleteFile(id, url)));
  };

  useEffect(() => {
    handleLoadImages();
  }, []);

  return (
    <>
      <h3>{title}</h3>
      <ImagesDrop onChange={handleDropImages} />
      <ShowImages images={images} onDelete={handleRemoveLocalImage} />
      <div className="buttonContainer">
        <Button
          type="submit"
          onClick={() => handleSendImages()}
          disabled={buttonDisabled}
        >
          Upload
        </Button>
        {buttonDisabled && <h4>Wysyłanie...</h4>}
      </div>
      <ShowImages
        linkedImages={uploadedImages}
        onDelete={handleRemoveImageFromServer}
      />
    </>
  );
};
