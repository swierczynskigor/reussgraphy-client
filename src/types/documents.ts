import { FolderTypeEnum } from "./photos";
import { Video } from "./video";

export interface HeaderDocumentI {
  _id: string;
  id: string;
  sections: SectionI[];
  title: string;
  description: string;
  type: FolderTypeEnum;
  photosVisible: boolean;
}

export interface SectionI {
  title: string;
  content: string;
  image: string;
}

export interface VideoDocutmentI {
  id: string;
  videos: Video[];
}
