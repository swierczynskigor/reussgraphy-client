export type Video = {
  id: string;
  title: string;
  content: string;
  type: VideoType;
};

export enum VideoType {
  YOUTUBE = "youtube",
  INSTAGRAM = "instagram",
}
