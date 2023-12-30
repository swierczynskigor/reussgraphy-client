/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { ImagePreview } from "@/components";
import "./ShowImages.scss";

import { apiUrl } from "@/constant";
import { PhotoI } from "@/types";
import { getImagePath } from "@/utils";
import { useEffect, useState } from "react";

interface ShowImagesI {
  images?: string[];
  linkedImages?: PhotoI[];
  onDelete?: (idx: string) => void;
  onImageClick?: (idx: string) => void;
}

export const ShowImages = ({
  images,
  linkedImages,
  onDelete,
  onImageClick,
}: ShowImagesI) => {
  return (
    <div className="images-container">
      {images
        ? images?.map((image, idx) => (
            <ImagePreview
              key={idx}
              id={idx.toString()}
              image={image}
              alt={`img${idx}`}
              onDelete={onDelete && (() => onDelete(idx.toString()))}
              onImageClick={
                onImageClick && (() => onImageClick(idx.toString()))
              }
            />
          ))
        : linkedImages?.map((image) => (
            <ImagePreview
              key={image.id}
              id={image.id}
              image={getImagePath(image, "thumb")}
              alt={`img${image.id}`}
              onDelete={onDelete && (() => onDelete(image.id))}
              onImageClick={onImageClick && (() => onImageClick(image.id))}
            />
          ))}
    </div>
  );
};
