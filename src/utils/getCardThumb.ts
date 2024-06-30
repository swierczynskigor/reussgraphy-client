import { storageBucketUrl } from "@/constant";

export const getCardThumb = (id: string, folder: string) =>
  `${storageBucketUrl}/api/thumb/${folder}/${id}.jpg`;
