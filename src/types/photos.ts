/**
 * @interface PhotoI
 * @param _id: string; // id from mongoDB
 * @param id: string; // id from the image
 * @param path: string; // path to the image
 * @param album: string; // album name
 * @param thumbPath: string; // path to the thumbnail
 */
export interface PhotoI {
  _id: string;
  id: string;
  path: string;
  album: string;
  thumbPath: string;
  extencion: string;
}

export interface FolderI {
  name: string;
  image: string;
  title: string;
}
