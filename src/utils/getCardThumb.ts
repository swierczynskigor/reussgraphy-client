import { storageBucketUrl } from "@/constant";

export const getCardThumb = (id: string, folder: string) =>
  `${storageBucketUrl}/${folder}/thumb-${id}.jpg`;
