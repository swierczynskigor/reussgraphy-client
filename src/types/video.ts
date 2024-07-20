export type Video = {
  id: string;
  title: string;
  description: string;
  url: string;
  type: VideoType;
};

export enum VideoType {
  YOUTUBE = "youtube",
  INSTAGRAM = "instagram",
}
