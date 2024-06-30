import { storageBucketUrl } from "@/constant";
import { PhotoI } from "@/types";

export const getImagePath = (
  image: PhotoI,
  type: "thumb" | "fullsize" = "fullsize"
) => {
  // if (type === "thumb") return `${storageBucketUrl}/${image.thumbPath}`;
  // else if (type === "fullsize") return `${storageBucketUrl}/${image.path}`;
  if (type === "thumb")
    return `${storageBucketUrl}/api/thumb/${image.album}/${image.id}.${image.extencion}`;
  else if (type === "fullsize")
    return `${storageBucketUrl}/api/image/${image.album}/${image.id}.${image.extencion}`;
  return "";
};
