import { storageBucketUrl } from "@/constant";
import { PhotoI } from "@/types";

export const getImagePath = (
  image: PhotoI,
  type: "thumb" | "fullsize" = "fullsize"
) => {
  if (type === "thumb") return `${storageBucketUrl}/${image.thumbPath}`;
  else if (type === "fullsize") return `${storageBucketUrl}/${image.path}`;
  return "";
};
